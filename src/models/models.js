import Category from "./ category.model";
import Component from "./ component.model";

const models = {Category,Component};

Object.values(models).forEach(model => {
    if (model.associate){
        model.associate(models);
    }
});

export default models;