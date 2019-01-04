console.log("ready");

/*----- constants -----*/

class Tamagotchi {
    constructor(name, imageURL) {
        this.name = name;
        this.hunger = 1;
        this.sleepiness = 1;
        this.boredom = 1;
        this.age = 1;
        this.imageURL = imageURL;
        //tickChart has a random number as its threshold appended to the each category,
        //the higher or lower the threshold the faster the curCount and property conditions ticks
        //object as part of the class, gave each tamagotchi personality
        this.tickChart = {
            hunger: {
                threshold: getRandomBetween(7, 10),
                curCount: 0,
            },
            sleepiness: {
                threshold: getRandomBetween(20, 30),
                curCount: 0,
            },
            boredom: {
                threshold: getRandomBetween(15, 25),
                curCount: 0,
            },
            age: {
                threshold: getRandomBetween(100, 150),
                curCount: 0,
            }
        }
        console.log(this.tickChart)
    }
    heartBeat() {
        if (this.isDead()) return;
        //for in gets you keys not prop and is looping through the tickChart

        //because each key is the same name of the class's property, the curCount will play off
        //the class property increasing the class property once curCount reaches its threshold
        for (let condition in this.tickChart) {
            this.tickChart[condition].curCount++;
            //everytime each conditions curCount reaches its random threshold between the min and max
            //the condition for the ticChart will be increase by 1 until it reaches the threshold.
            //increasing the condition of the class's property.
            if (this.tickChart[condition].curCount === this.tickChart[condition].threshold) {
                this[condition]++;
                this.tickChart[condition].curCount = 0;
                console.log(`${condition}: ${this[condition]}`)
            }
        }
    }
    feed() {
        //you can only feed the tamagotchis if the hunger is greater or equal to 4
        //once the feed button is clicked, the condition is decreased by 2
        if (this.hunger >= 4) {
            this.hunger -= 2;
        }
    }
    sleep() {
        //you can only feed the tamagotchis if the sleepiness is greater or equal to 4
        //once the feed button is clicked, the condition is decreased by 2
        if (this.sleepiness >= 4) {
            this.sleepiness -= 2;
        }
    }
    bored() {
        //you can only feed the tamagotchis if the boredom is greater or equal to 4
        //once the feed button is clicked, the condition is decreased by 2
        if (this.boredom >= 4) {
            this.boredom -= 2;
        }
    }
    isDead() {
        //once any of these conditions are met, the tamagotchi dies
        return (this.hunger >= 10 || this.sleepiness >= 10 || this.boredom >= 10)
    }
    render() {
        if (this.isDead()) {
        //if you wanted different death images add deathURL to constructor and 
        //add ${this.deathURL} to death div and add image to new tamagotchi that is being pushed.
        //rendering each individual tamagotchi
            return `
            <div class="dead">
                <h2> ${this.name} HAS DIED! </h2>
                <img src="images/death2.gif">
            </div>
        `;
        } else {
            //this code block was the answer to having multiple tamagotchis and buttons on screen
            // ${this.element} is being used whenever you create or push a tamagotchi
            //tickChart using the random numbers, generates each tamagotchi differently giving it personality
            return `
        <div>
        <div id="tname">
                <img class ="tpic" src="${this.imageURL}">
                <h2 id="mname">${this.name}<h2>
                <div id="conditions">
                <p>Hunger: ${this.hunger}</p>
                <p>Sleepiness: ${this.sleepiness}</p>
                <p>Boredom: ${this.boredom}</p>
                <p>Age: ${this.age}</p>
                </div>
                <button data-name="${this.name}">feed</button>
                <button data-name="${this.name}">sleep</button>
                <button data-name="${this.name}">bored</button>
            </div>

        </div>
        `;
        }
    }

}

/*----- cached element references -----*/

let section = document.getElementById('container');

let playBtn = document.getElementById('meet-t')

/*----- event listeners -----*/


section.addEventListener('click', function (evt) {
    //listening for start game button and pushing in array of newPets
    if (evt.target.tagName !== 'BUTTON') return;
    //data-name is an attribute attached to each tamagotchi
    //telling you which button on which tamagotchi you clicked
    let name = evt.target.getAttribute('data-name');
    //tmog looking for specific tamagothi and targets each method(feed, sleep, bored) to that tamagotchi
    let tmog = game.newPets.find(p => p.name === name);
    tmog[evt.target.textContent]();
    game.render();
});



/*----- functions -----*/

game = {
    newPets: [],
    //when you initialize, its renders two tamagotchis with a heartBeat interval
    //using (setInterval) of one second.
    init() {
        this.newPets.push(new Tamagotchi('Jabs', 'images/jabba.gif'), new Tamagotchi('Tiny', 'images/ewok.gif'));
        this.timerId = setInterval(this.heartBeat.bind(this), 1000)
    },
    //this function is saying forEach pet, add the heartBeat!
    heartBeat() {
        this.newPets.forEach(function (pet) {
            pet.heartBeat();
        });
        this.render();
    },
    //then renders everything
    render() {
        let html = '';
        this.newPets.forEach(function (pet) {
            html += pet.render()
        });
        section.innerHTML = html;
        playBtn.style.visibility = this.newPets.length ? "hidden" : "visible";
    },

}

//begins game
playBtn.addEventListener('click', game.init.bind(game));

//provides the random number tickCounts uses
function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}