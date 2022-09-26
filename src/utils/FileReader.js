// 下载文件
export const _exportAndDownload = (fileUrl, filename = '下载文件.doc') => {
  // console.log('fileUrl==============', fileUrl);
  const a = document.createElement('a');
  a.download = `${filename}`;
  a.href = fileUrl; // 该result属性包含一个data:表示文件数据的URL。
  document.body.appendChild(a); // 修复firefox中无法触发click
  a.click();
  document.body.removeChild(a);
};

/**
 * @description 文件流处理函数；
 *
 */
export const exportAndDownload = (file, filename = 'data') => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (e) => {
    const a = document.createElement('a');
    a.download = `${filename}.xlsx`;

    a.href = e.target.result; // 该result属性包含一个data:表示文件数据的URL。

    document.body.appendChild(a); // 修复firefox中无法触发click

    a.click();
    document.body.removeChild(a);
  };
};

/**
 * @description 文件流处理函数；
 *
 */
export const newExportAndDownload = (
  file,
  filename = 'data',
  blobType = 'application/vnd.ms-excel',
) => {
  let fileData = new Blob([file], {
    type: blobType,
  });
  const reader = new FileReader();
  reader.readAsDataURL(fileData);
  reader.onload = (e) => {
    const a = document.createElement('a');
    a.download = `${filename}`;
    a.href = e.target.result; // 该result属性包含一个data:表示文件数据的URL。
    document.body.appendChild(a); // 修复firefox中无法触发click
    a.click();
    document.body.removeChild(a);
  };
};
