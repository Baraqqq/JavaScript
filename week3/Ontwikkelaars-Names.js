const objectOne = {
    firstName: 'Ilias',
    lastName: 'Bach',
    age: 2022 - 2005,
    job: 'dreamer',
    friends: ['Schaap', 'Vis'],
    getFullName: function(){
        return `${this.firstName} ${this.lastName}`;
    },
};
console.log(objectOne.friends.length);