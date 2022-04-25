import TalOss from '@xes/tal-oss'
async function uploadFiles({uploadFrom, uploadTo}) {
  // console.log({uploadFrom, uploadTo})
    return new Promise((resolve, reject)=>{
        new TalOss({
            uploadFrom, //  文件夹
            uploadTo,
            bucket: 'componentlib',
            limit: 100,
            accessKeyId: 'c9c72e1288643a4cee2925e8880521fb',
            accessKeySecret: '317e1d4c3863766abffa30eb955a2530',
            success() {
              console.log('================全部文件上传完毕================');
              resolve()
            },
            fail(err) {
              console.log('================文件上传失败================',err);
              reject()
            }
          }).upload();
    })
}

// 单个文件上传，无需指定uploadFrom
async function uploadFile({uploadFilePath, uploadTo}) {
  return new Promise((resolve, reject)=>{
    new TalOss({
      uploadTo,
      bucket: 'componentlib',
      limit: 100,
      accessKeyId: 'c9c72e1288643a4cee2925e8880521fb',
      accessKeySecret: '317e1d4c3863766abffa30eb955a2530',
      success() {
        console.log('================全部文件上传完毕================');
        resolve()
      },
      fail() {
        console.log('================文件上传失败================');
        reject()
      }
    }).uploadFile(uploadFilePath);
  })
}

export default {
	uploadFile,
	uploadFiles
}
