import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AppConfig {

    constructor(private http: HttpClient) { }

    static readonly KEYS = {
        APP_URI: 'app_uri',
        CLIENT_ID: 'clienteId',
        TOKEN_HANDLER: 'tokenHandler'
    };

    private config: Object = null;

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('/config/config.json').catch((error: any): any => {
                console.log('Configuration file "config.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe((responseData) => {
                this.config = responseData;
                console.log('[LOG] reading configuration file');

                resolve(true);
            });

        });
    }
}
