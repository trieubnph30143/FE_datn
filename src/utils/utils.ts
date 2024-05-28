
import { parseISO, format } from 'date-fns';

export function formatDate(isoString:any) {
  // Chuyển đổi ISO string thành đối tượng Date
  const date = parseISO(isoString);
  // Định dạng lại ngày theo định dạng mong muốn, ví dụ: dd/MM/yyyy HH:mm:ss
  return format(date, 'dd/MM/yyyy HH:mm:ss');
}
export function limitDescription(description: any, maxLength: any) {
  if (description.length <= maxLength) {
    return description;
  } else {
    return description.slice(0, maxLength) + "...";
  }
}

export const calculateProgress = (data:any) => {
  return data.map((course:any) => {
    let totalSubLessons = 0;
    let completedSubLessons = 0;

    course.lesson_progress.forEach((lesson:any) => {
      lesson.sub_lesson.forEach((subLesson:any) => {
        totalSubLessons++;
        if (subLesson.completed && subLesson.result) {
          completedSubLessons++;
        }
      });
    });

    const progressPercentage = (completedSubLessons / totalSubLessons) * 100;
    return Math.ceil(progressPercentage);
  });
};
export function convertToVND(amount:any) {
  // Chuyển đổi số tiền thành chuỗi và thêm dấu phân tách hàng nghìn
  let formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Thêm ký hiệu tiền tệ "₫" vào cuối
  return formattedAmount + " ₫";
}

export function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng được tính từ 0-11, cần cộng thêm 1
  const year = today.getFullYear();

  return `Hà Nội,${day}/${month}/${year}`;
}
