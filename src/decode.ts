import * as fs from 'fs';
import * as pngjs from 'pngjs';
export function decodeByLsb(imgUrl: string): Promise<String> {
    const fileBuffer = fs.readFileSync(imgUrl);
    const png = new pngjs.PNG();

    return new Promise((resolve, reject) => {
        png.parse(fileBuffer, function (err, image) {
            if (err) return reject(err);
            let binaryImg = '';
            let textResult = '';

            for (let i = 0; i < image.data.length; i++) {
                binaryImg += image.data[i].toString(2).slice(-1);
            }

            const binaryChars = binaryImg.match(/.{1,8}/g) || [];
            for (let i = 0; i < binaryChars.length; i++){
                textResult += String.fromCharCode(parseInt(binaryChars[i], 2));
            }


            resolve(textResult);
        });
    });


}