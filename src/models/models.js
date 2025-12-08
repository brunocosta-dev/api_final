import Categoria from './category.model.js';
import Componente from './component.model.js';
import Gabinete from './computerCase.model.js';
import Equipamento from './equipment.model.js';

const Models = {Categoria,Componente,Gabinete,Equipamento};

Object.values(Models).forEach(model => {
    if (model.associate){
        model.associate(Models);
    }
});

export default Models;