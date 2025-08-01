export function splitParagraphs(text: string): string[] {
  return text
    .split(/\r?\n+/)        // tách theo xuống dòng (Windows: \r\n, Unix: \n)
    .map(p => p.trim())     // loại bỏ khoảng trắng thừa
    .filter(p => p.length); // loại bỏ đoạn rỗng
}
