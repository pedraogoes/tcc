import fs from 'fs';
import { UploadedFile } from 'express-fileupload'
import path from 'path'
import { AppErrors } from '../../../shared/errors/AppErrors';

const mimetypesAllow = [
    'jpeg',
    'jpg',
    'png'
]

interface IResponse {
    file: string;
}

export class ImageToBase64 {

    public async run(file: UploadedFile ): Promise<IResponse> {

        const mimetypeCurrentFile = file.mimetype.split('/');

        if(!mimetypesAllow.includes(mimetypeCurrentFile[1])) {
            throw new AppErrors('Tipo de arquivo não permitido', 401);
        }

        const image = path.resolve(__dirname, '..', 'temp', file.md5 + '.' + mimetypeCurrentFile[1]);

        file.mv(image, (err) => {
            if(err) {
                throw new AppErrors('Erro ao salvar arquivo, tente novamente', 401);
            }
        });

        try {
            const bitmap = fs.readFileSync(image);

            const payload = 'data:' + file.mimetype + ';base64, ' + Buffer.from(bitmap).toString('base64');

            fs.unlinkSync(image);
           
            return { file: payload };

        } catch (err) {
            fs.unlinkSync(image);

            throw new AppErrors(`Erro ao salvar arquivo: ${err}`, 401);
        }
    }
}