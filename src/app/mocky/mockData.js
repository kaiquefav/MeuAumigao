const pets = [
    {
        type: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum mattis sem, maximus consequat magna mattis vel. Etiam nec libero nec ex congue rhoncus. Aliquam sed ipsum arcu. Sed pellentesque nibh a ex dapibus, eu finibus erat convallis. Nulla ultricies.',
        name: 'Mel', race: 'Vira-Lata', size: 'Médio', age: 'Adulto', behavior: 'Calmo', localTitle: 'Local Exemplo 1', localStreet: 'Rua Exemplo 1', localDistrict: 'Bairro Exemplo 1', localNum: '11', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5d390a1df7e583326da377b8/big.jpg?1564019229'
    },
    {
        type: 0,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum mattis sem, maximus consequat magna mattis vel. Etiam nec libero nec ex congue rhoncus. Aliquam sed ipsum arcu. Sed pellentesque nibh a ex dapibus, eu finibus erat convallis. Nulla ultricies.',
        name: 'Rex', race: 'Vira-Lata', size: 'Médio', age: 'Novo', behavior: 'Calmo', localTitle: 'Local Exemplo 2', localStreet: 'Rua Exemplo 2', localDistrict: 'Bairro Exemplo 2', localNum: '22', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5d93921df7e583479b69b738/big.jpg?1569952283'
    },
    {
        type: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum mattis sem, maximus consequat magna mattis vel. Etiam nec libero nec ex congue rhoncus. Aliquam sed ipsum arcu. Sed pellentesque nibh a ex dapibus, eu finibus erat convallis. Nulla ultricies.',
        name: 'Princesa', race: 'Siamês', size: 'Pequeno', age: 'Adulto', behavior: 'Calmo', localTitle: 'Local Exemplo 3', localStreet: 'Rua Exemplo 3', localDistrict: 'Bairro Exemplo 3', localNum: '33', petPic: 'https://qph.fs.quoracdn.net/main-qimg-a9f43765a00412105e7161b0794783e4'
    },
    {
        type: 0,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum mattis sem, maximus consequat magna mattis vel. Etiam nec libero nec ex congue rhoncus. Aliquam sed ipsum arcu. Sed pellentesque nibh a ex dapibus, eu finibus erat convallis. Nulla ultricies.',
        name: 'Don', race: 'Labrador', size: 'Grande', age: 'Velho', behavior: 'Calmo', localTitle: 'Local Exemplo 4', localStreet: 'Rua Exemplo 4', localDistrict: 'Bairro Exemplo 4', localNum: '44', petPic: 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_1005/master/969.jpg?width=300&quality=85&auto=format&fit=max&s=26fe0a6479a2b57e12f31c39e6b1c1ef'
    },
    {
        type: 0,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum mattis sem, maximus consequat magna mattis vel. Etiam nec libero nec ex congue rhoncus. Aliquam sed ipsum arcu. Sed pellentesque nibh a ex dapibus, eu finibus erat convallis. Nulla ultricies.',
        name: 'Belinha', race: 'Spitz Alemão', size: 'Pequeno', age: 'Novo', behavior: 'Calmo', localTitle: 'Local Exemplo 5', localStreet: 'Rua Exemplo 5', localDistrict: 'Bairro Exemplo 5', localNum: '55', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5c37abae8b0dad2aece0a4fc/big.jpg?1547152298'
    },
    {
        type: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum mattis sem, maximus consequat magna mattis vel. Etiam nec libero nec ex congue rhoncus. Aliquam sed ipsum arcu. Sed pellentesque nibh a ex dapibus, eu finibus erat convallis. Nulla ultricies.',
        name: 'Pagu', race: 'Ragdoll', size: 'Pequeno', age: 'Novo', behavior: 'Calmo', localTitle: 'Local Exemplo 6', localStreet: 'Rua Exemplo 6', localDistrict: 'Bairro Exemplo 6', localNum: '66', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5dad06dff7e583479b69d35c/big.jpg?1571620574'
    },
];
const petsCommitments = [
    { name: 'Princesa', localTitle: 'Local Exemplo 3', localStreet: 'Rua Exemplo 3', localDistrict: 'Bairro Exemplo 3', localNum: '33', date: '02/06/2020', time: '09h45', petPic: 'https://qph.fs.quoracdn.net/main-qimg-a9f43765a00412105e7161b0794783e4' },
    { name: 'Don', localTitle: 'Local Exemplo 4', localStreet: 'Rua Exemplo 4', localDistrict: 'Bairro Exemplo 4', localNum: '44', time: '15h40', date: '12/07/2020', petPic: 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_1005/master/969.jpg?width=300&quality=85&auto=format&fit=max&s=26fe0a6479a2b57e12f31c39e6b1c1ef' },
    { name: 'Belinha', localTitle: 'Local Exemplo 5', localStreet: 'Rua Exemplo 5', localDistrict: 'Bairro Exemplo 5', localNum: '55', time: '08h10', date: '15/06/2020', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5c37abae8b0dad2aece0a4fc/big.jpg?1547152298' },
    { name: 'Pagu', localTitle: 'Local Exemplo 6', localStreet: 'Rua Exemplo 6', localDistrict: 'Bairro Exemplo 6', localNum: '66', time: '10h00', date: '26/06/2020', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5dad06dff7e583479b69d35c/big.jpg?1571620574' },
];

export { pets, petsCommitments };
