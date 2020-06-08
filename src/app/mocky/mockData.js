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
    { status: 'Pendente', name: 'Princesa', localTitle: 'Local Exemplo 3', localStreet: 'Rua Exemplo 3', localDistrict: 'Bairro Exemplo 3', localNum: '33', date: '02/06/2020', time: '09h45', petPic: 'https://qph.fs.quoracdn.net/main-qimg-a9f43765a00412105e7161b0794783e4' },
    { status: 'Recusado', name: 'Don', localTitle: 'Local Exemplo 4', localStreet: 'Rua Exemplo 4', localDistrict: 'Bairro Exemplo 4', localNum: '44', time: '15h40', date: '12/07/2020', petPic: 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_1005/master/969.jpg?width=300&quality=85&auto=format&fit=max&s=26fe0a6479a2b57e12f31c39e6b1c1ef' },
    { status: 'Aprovado', name: 'Belinha', localTitle: 'Local Exemplo 5', localStreet: 'Rua Exemplo 5', localDistrict: 'Bairro Exemplo 5', localNum: '55', time: '08h10', date: '15/06/2020', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5c37abae8b0dad2aece0a4fc/big.jpg?1547152298' },
    { status: 'Pendente', name: 'Pagu', localTitle: 'Local Exemplo 6', localStreet: 'Rua Exemplo 6', localDistrict: 'Bairro Exemplo 6', localNum: '66', time: '10h00', date: '26/06/2020', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5dad06dff7e583479b69d35c/big.jpg?1571620574' },
];

const usersCommitments = [
    { status: 'Pendente', userName: 'Kaique', userEmail: 'kaique@email.com', userPhone: '(19) 12345-1234', petName: 'Princesa', date: '02/06/2020', time: '09h45', petPic: 'https://qph.fs.quoracdn.net/main-qimg-a9f43765a00412105e7161b0794783e4', userPic: 'https://cdn.accentuate.io/256188999/38313965191/men-windbreaker-615-v1586448811067.jpg?615x758' },
    { status: 'Aprovado', userName: 'Diogo', userEmail: 'diogo@email.com', userPhone: '(19) 12345-1234', petName: 'Princesa', date: '04/06/2020', time: '11h45', petPic: 'https://qph.fs.quoracdn.net/main-qimg-a9f43765a00412105e7161b0794783e4', userPic: 'https://media.istockphoto.com/photos/happy-laughing-man-picture-id544358212?k=6&m=544358212&s=612x612&w=0&h=odURMNz2hty8LIfpVahaaUKpGU4vd-UlZx4jy-OAnJA=' },
    { status: 'Aprovado', userName: 'Leonardo', userEmail: 'leonardo@email.com', userPhone: '(19) 12345-1234', petName: 'Don', time: '11h40', date: '12/07/2020', petPic: 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_1005/master/969.jpg?width=300&quality=85&auto=format&fit=max&s=26fe0a6479a2b57e12f31c39e6b1c1ef', userPic: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { status: 'Pendente', userName: 'Bruna', userEmail: 'bruna@email.com', userPhone: '(19) 12345-1234', petName: 'Don', time: '15h40', date: '12/07/2020', petPic: 'https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_1005/master/969.jpg?width=300&quality=85&auto=format&fit=max&s=26fe0a6479a2b57e12f31c39e6b1c1ef', userPic: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { status: 'Aprovado', userName: 'Fernando', userEmail: 'fernando@email.com', userPhone: '(19) 12345-1234', petName: 'Rex', time: '08h10', date: '15/06/2020', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5d93921df7e583479b69b738/big.jpg?1569952283', userPic: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { status: 'Pendente', userName: 'Ana', userEmail: 'ana@email.com', userPhone: '(19) 12345-1234', petName: 'Pagu', time: '16h20', date: '26/06/2020', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5dad06dff7e583479b69d35c/big.jpg?1571620574', userPic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTlZctymf_CNc7RUzL8ChaWO6aK23PqZGFj44iO44KgiA8-qWd7&usqp=CAU' },
    { status: 'Aprovado', userName: 'Roberto', userEmail: 'roberto@email.com', userPhone: '(19) 12345-1234', petName: 'Pagu', time: '10h00', date: '22/06/2020', petPic: 'https://petanjo-production.s3.amazonaws.com/uploads/production/pets/photos/5dad06dff7e583479b69d35c/big.jpg?1571620574', userPic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2LZb6JSkBLG2AvuuIHYUPl6gNaY8Aw8OoUBPt1pm-gzvC9DH5&usqp=CAU' },
];

const user = {
    userType: 1,
    name: 'Ana da Silva',
    doc: '111.111.111-11',
    email: 'ana@email.com',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum mattis sem, maximus consequat magna mattis vel. Etiam nec libero nec ex congue rhoncus. Aliquam sed ipsum arcu. Sed pellentesque nibh a ex dapibus, eu finibus erat convallis. Nulla ultricies.',
    password: '123123',
    profilePic: 'https://evada-images.global.ssl.fastly.net/76d1ea39-a4eb-4270-b9dc-899653415f8f/home-tile-person-3.jpg?width=345&height=345',
    rating: 5,
}

const ong = {
    userType: 0,
    name: 'AUjudando os Animais',
    doc: '111.111.111-11',
    email: 'aujudando@email.com',
    description: 'Uma ONG que proporciona uma ajuda à estes animaizinhos que estão nessa situação de abandono nas ruas. Toda ajuda é bem vinda. Para contato, ligue: (11) 1111-1111.',
    password: '123123',
    profilePic: 'http://www.radiogramadonews.com.br/wp-content/uploads/2016/01/canil-da-prefeitura-de-gramado.jpg',
}

export { pets, petsCommitments, usersCommitments, user, ong };
