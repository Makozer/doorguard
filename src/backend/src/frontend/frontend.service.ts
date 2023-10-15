// Zuständigkeit: M
// Wird eh später durch angular ersetzt!
import { Injectable } from '@nestjs/common';
import { GuardEvent } from 'src/database/entitys/guardevent.entity';

@Injectable()
export class FrontendService {

    asBeautifulTable(headers: any, content: GuardEvent[]) {
        let output: string = "";
        output += this.htmlHeader();
        const now: Date = new Date();
        output += '<h1 class="mb-3">DoorGuard</h1><p>Last refresh: ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() +'</p><div class="container-md d-flex justify-content-center" style="width:666px;"><table class="table table-striped">';

        output += '<thead class="thead-light"><tr><thead class="thead-light">';
        for (let n in headers) {
            output += '<th scope="col">' + headers[n] + "</th>";
        }
        output += "</tr></thead>";

        for (let n in content) {
            output += "<tr>";
            //output += '<td scope="row">' + content[n].id  + "</td>";
            output += "<td>" + this.timestampToString(content[n].timestamp) + "</td>";
            output += "<td><b>" + content[n].type  + "</b></td>";
            output += "</tr>";
        }

        output += "</table></div>";
        output += this.htmlFooter();
        return output;
    }

    timestampToString(ts: Date) {
        let output: string = "";
        output += ts.getUTCFullYear() + ".";
        output += (ts.getUTCMonth() + 1) + ".";
        output += ts.getUTCDate() + " ";
        output += "<b>" + ts.toLocaleTimeString() + "</b>";
        return output;
    }

    htmlHeader() {
        return '<!doctype html><html lang="en"><title>DoorGuard</title><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></header><body><div class="align-items-center">';
    }

    htmlFooter() {
        return "</div></body></html>";
    }
}
