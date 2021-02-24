import Document, {
    Html,
    Main
} from 'next/document';

import { Roboto } from '../elements/Roboto';

import { NextHeadCustom, NextScriptCustom } from '../init/document';
export default class CustomDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        const userAgent = ctx.req && ctx.req.headers['user-agent'];
    
        return {
            ...initialProps,
            userAgent
        };
    }

    render() {
    
        return (
            <Html lang='en'>
                <NextHeadCustom />
                <Roboto />
                <body>
                    <Main />
                    <NextScriptCustom />
                </body>
            </Html>
        );
    }
}

