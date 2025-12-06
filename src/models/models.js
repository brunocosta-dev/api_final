import Category from './category.model.js';
import Components from './components.model.js';

const models = {Category,Components};

Object.values(models).forEach(model => {
    if (model.associate){
        model.associate(models);
    }
});

export default models;