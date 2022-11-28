import { useRef, useState } from 'react';
import { FileUpload, Close } from '@mui/icons-material';
import { TextField, IconButton } from '@mui/material';

interface IParamsDropzone {
    name: string;
    labelInputFile?: string;    
}

export function Dropzone({
    name,
    labelInputFile
}: IParamsDropzone) {
    const attachmentRef = useRef<HTMLInputElement>();
    const [attachmentLabel, setAttachmentLabel] = useState<string>(labelInputFile? labelInputFile : 'Anexar');

    return (
        <div
            style={{
                width: '100%',
                minWidth: '18ch',
                minHeight: '6.2ch',
                margin: '0px',
                paddingTop: '15px',
                paddingBottom: '4px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                borderColor: 'rgb(0 0 0 / 40%)',
                borderStyle: 'dashed',
                borderRadius: '4px',
                borderWidth: '1px',     
                right: '25px',
                bottom: '9px',
                cursor: 'pointer'
            }}
            onClick={() => {
                attachmentRef.current?.click()                
            }}
        >
           

            {
                (
                    attachmentRef.current?.files === null
                    ||
                    attachmentRef.current?.files?.length === 0  
                ) 
                &&
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '100%',
                        paddingLeft: '30px',
                        paddingRight: '10px',
                        paddingTop: '0px',
                        paddingBottom: '10px'
                    }}
                >
                    <FileUpload  htmlColor='rgb(0 0 0 / 60%)' />
                        <span
                            style={{ 
                                marginLeft: '8px',
                                overflowX: 'hidden',
                                
                            }}
                            >
                            {
                                attachmentLabel
                            }
                    </span>
                </div>
            }

            { 
                (
                    attachmentRef.current?.files !== null
                    || attachmentRef.current?.files?.length > 0
                )  
                &&
                
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '100%',
                        paddingLeft: '30px',
                        paddingRight: '10px',
                        paddingTop: '0px',
                        paddingBottom: '10px'
                    }}
                >
                    <FileUpload  htmlColor='rgb(0 0 0 / 60%)' />
                    <span>
                        { 
                            (attachmentLabel.length > 40) ?
                                attachmentLabel.substring(0, 40) + '...'
                            :
                                attachmentLabel
                        }
                    </span>                      
                    
                </div>
                
            }           


            <TextField
                margin='normal'
                fullWidth
                id={name}                             
                name={name}
                sx={{ display: 'none' }}
                type='file'
                inputRef={attachmentRef}
                onChange={() => {
                    let file = attachmentRef.current?.files;
                    
                    setAttachmentLabel( file ? file[0].name : attachmentLabel);
                }}
            />    
        </div>
    )
}