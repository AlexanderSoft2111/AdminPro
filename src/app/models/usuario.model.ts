import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {   
     
    constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROL',
    public google?: boolean,
    public uid?: string
    ){}

    get imgUrl(){

        if(!this.img){
            return `${base_url}/uploads/usuarios/no-image`;
        } else if(this.img?.includes('https://')){
            return this.img;
        }else if(this.img){
            //http://localhost:3005/api/uploads/medicos/e57e838e-dc27-489e-891f-5e30ce1d8aff.jpg
            return `${base_url}/uploads/usuarios/${this.img}`;
        } else {
            return `${base_url}/uploads/usuarios/no-image`;
        }
        
    }

} 