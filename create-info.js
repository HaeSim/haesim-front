import fs from 'fs';
import path from 'path';

// 설정 가능한 디렉토리 경로들
const SOURCE_DIR = './src'; // 시작점 디렉토리
const DESTINATION_DIR = './collected-files'; // 파일들을 복사할 디렉토리
const PATH_MAPPING_FILE = './collected-files/_file-paths.json'; // 경로 매핑 파일

// 제외할 디렉토리 경로들 (SOURCE_DIR로부터의 상대 경로)
const EXCLUDE_DIRS = ['components/ui'];

function createDirIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getUniqueFileName(filePath, existingFiles) {
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  let newName = `${baseName}${ext}`;
  let counter = 1;

  while (existingFiles.has(newName)) {
    newName = `${baseName}_${counter}${ext}`;
    counter++;
  }

  return newName;
}

function isExcludedPath(filePath) {
  // SOURCE_DIR로부터의 상대 경로를 구함
  const relativePath = path.relative(SOURCE_DIR, filePath);

  // 제외할 디렉토리 목록과 비교
  return EXCLUDE_DIRS.some((excludePath) =>
    relativePath.startsWith(excludePath.replace(/\\/g, '/'))
  );
}

function collectTypeScriptFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory does not exist: ${dir}`);
    return fileList;
  }

  // 현재 디렉토리가 제외 대상인지 확인
  if (isExcludedPath(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // node_modules와 .next 디렉토리는 제외
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        collectTypeScriptFiles(filePath, fileList);
      }
    } else if (file.match(/\.(ts|tsx)$/)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function copyAndMapFiles() {
  createDirIfNotExists(DESTINATION_DIR);

  const typeScriptFiles = collectTypeScriptFiles(SOURCE_DIR);
  const existingFiles = new Set();
  const fileMappings = [];

  typeScriptFiles.forEach((originalPath) => {
    // SOURCE_DIR를 기준으로 상대 경로 생성
    const relativePath = path.relative(SOURCE_DIR, originalPath);

    // 새로운 파일 이름 생성
    const newFileName = getUniqueFileName(relativePath, existingFiles);
    existingFiles.add(newFileName);

    // 새로운 경로
    const newPath = path.join(DESTINATION_DIR, newFileName);

    // 파일 복사
    fs.copyFileSync(originalPath, newPath);

    // 매핑 정보 저장 - SOURCE_DIR 기준 경로로 저장
    fileMappings.push({
      originalPath: relativePath,
      newPath: path.relative('.', newPath),
    });
  });

  // 매핑 정보를 JSON 파일로 저장
  fs.writeFileSync(
    PATH_MAPPING_FILE,
    JSON.stringify(fileMappings, null, 2),
    'utf8'
  );

  console.log(`Source directory: ${SOURCE_DIR}`);
  console.log(`Excluded directories: ${EXCLUDE_DIRS.join(', ')}`);
  console.log(`Copied ${fileMappings.length} files to ${DESTINATION_DIR}`);
  console.log(`Path mapping saved to ${PATH_MAPPING_FILE}`);
}

// 스크립트 실행
try {
  copyAndMapFiles();
} catch (error) {
  console.error('Error occurred:', error);
}
