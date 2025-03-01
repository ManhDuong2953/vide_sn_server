import fs from 'fs';
import path from 'path';

const folder = './src'; // Thư mục code của bạn

const addJsExtension = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      addJsExtension(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Regex thêm .js nếu import chưa có
      const regex = /(import .*? from ['"])(\.{1,2}\/.*?)(['"])/g;
      content = content.replace(regex, (match, p1, p2, p3) => {
        if (!p2.endsWith('.js') && !p2.includes('?')) {
          return `${p1}${p2}.js${p3}`;
        }
        return match;
      });

      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
    }
  });
};

addJsExtension(folder);
console.log('🎯 Đã thêm .js vào tất cả các import path!');
