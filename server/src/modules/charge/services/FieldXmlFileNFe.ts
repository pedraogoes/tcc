import xml2js from 'xml2js';
import { AppErrors } from '../../../shared/errors/AppErrors';

interface IFieldsXmlNFeItems {
    description: string;
    value: number;
    gross_weight: number;
    net_weight: string;
}

interface IFieldsXmlNFe {
    nfe_number: string;
    nfe_gross_weight: number;
    nfe_net_weight: number;
    need_date: Date;
    shipper: string,
    boarding: string,
    freight_value: number;
    boarding_detail: string;
    landing: string,
    landing_detail: string;
    nfe_attachment: string;

    items: IFieldsXmlNFeItems[]
}

interface IRun {
    xml: Buffer;
}

export class FieldXmlFileNFe {

    public async run({ xml }: IRun): Promise<IFieldsXmlNFe> {

        const nfe: IFieldsXmlNFe = {} as IFieldsXmlNFe;
        const nfeItems: IFieldsXmlNFeItems[] = [] as IFieldsXmlNFeItems[];   

        const xmlConverted = await xml2js.parseStringPromise(xml);

        if(!xmlConverted.nfeProc) {
            throw new AppErrors('XML inválido', 401);
        }

        nfe.nfe_number = xmlConverted.nfeProc.NFe[0].infNFe[0].ide[0].nNF[0] as string;
        nfe.need_date = xmlConverted.nfeProc.NFe[0].infNFe[0].ide[0].dhEmi[0] as Date;

        nfe.nfe_gross_weight = (xmlConverted.nfeProc.NFe[0].infNFe[0].transp[0].vol instanceof Array) ?
            xmlConverted.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].pesoB[0] as number
            : 0;
        nfe.nfe_net_weight = (xmlConverted.nfeProc.NFe[0].infNFe[0].transp[0].vol instanceof Array) ?
            xmlConverted.nfeProc.NFe[0].infNFe[0].transp[0].vol[0].pesoL[0]
            : 0;
        nfe.shipper = xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].CNPJ[0] as string;
        nfe.boarding = xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xMun[0] + ' - ' + xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].UF[0];
        nfe.boarding_detail = xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xLgr[0] + ', ' 
        + xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].nro[0] + ', '
        + xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xBairro[0] + ', CEP:' 
        + xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].CEP[0] + ', '
        + xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xMun[0] +  ' - ' 
        + xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].UF[0] + ', '
        + xmlConverted.nfeProc.NFe[0].infNFe[0].emit[0].enderEmit[0].xPais[0];
        nfe.landing = xmlConverted.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xMun[0] +  ' - ' + xmlConverted.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].UF[0];
        nfe.landing_detail = xmlConverted.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xLgr[0] + ', ' 
        + xmlConverted.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].nro[0] + ', '
        + xmlConverted.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xBairro[0] + ', CEP:' 
        + xmlConverted.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].CEP[0] + ', '
        + xmlConverted.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xMun[0] +  ' - ' 
        + xmlConverted.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].UF[0] + ', '
        + xmlConverted.nfeProc.NFe[0].infNFe[0].dest[0].enderDest[0].xPais[0];
        nfe.nfe_attachment = '';
        nfe.freight_value = xmlConverted.nfeProc.NFe[0].infNFe[0].total[0].ICMSTot[0].vFrete[0] as number;

        xmlConverted.nfeProc.NFe[0].infNFe[0].det.map((item: any) => {            
            nfeItems.push({
                description: item.prod[0].xProd[0] as string,
                gross_weight: item.prod[0].NCM[0] as number, 
                net_weight: item.prod[0].uCom[0] as string, 
                value: item.prod[0].vProd[0] as number, 
            })
        });
        
        nfe.items = nfeItems;
        
        return nfe;
    }
}