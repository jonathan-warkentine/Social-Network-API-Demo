const connection = require('../config/connection');
const {Thought, User} = require('../models');
const {usernames, thoughts} = require('./data');

//a util function
function selectRandom (arr) {
    const randIndex = Math.floor(Math.random()*arr.length);
    return arr[randIndex];
}

function generateUserSeeds () {
    let userSeeds = [];
    
    while (userSeeds.length<10){
        const usrnm = selectRandom(usernames);
        if (!userSeeds.map(user => user.username).includes(usrnm)){
            userSeeds.push({
                username: usrnm,
                email: `${usrnm}${Math.floor(Math.random()*1000)}@email.com`
            });
        }
    };

    return userSeeds;
}

function generateThoughtSeeds(){
    let thoughtSeeds = [];

    while (thoughtSeeds.length < 10){
        const tht = selectRandom(usernames);
        if (!thoughtSeeds.map(seed => seed.thoughtText).includes(tht)){
            thoughtSeeds.push({
                thoughtText: selectRandom(thoughts),
                username: selectRandom(usernames)
            });
        }
    }

    return thoughtSeeds;
}

async function seed(){
    const userSeeds = generateUserSeeds();
    const thoughtSeeds = generateThoughtSeeds();
    console.table(userSeeds);
    console.table(thoughtSeeds);

    //Clear each db collection
    await User.deleteMany({});
    await Thought.deleteMany({});
    
    //seed time!
    await Thought.insertMany(thoughtSeeds);
    await User.insertMany(userSeeds);

    console.info('Seeding complete! 🌱');
    process.exit(0);
}

seed();

console.log();