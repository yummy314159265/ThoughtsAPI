const usernames = [
    'longing',
    'jagged',
    'skeleton',
    'steadfast',
    'affinity',
    'forester',
    'article',
    'veil',
    'uphold',
    'violation',
    'rebel',
    'hand',
    'nightgown',
    'hotsprings',
    'kringle',
    'confront',
    'emphasize',
    'discrete',
    'refuse',
    'hopeful',
]

const emailDomains = [
    `@gmail.com`,
    `@aol.com`,
    `@hotmail.com`,
    `@yahoo.com`,
    `@email.com`,
    `@protonmail.com`,
]

const thoughts = [
    `"R-E-S-P-E-C-T, find out what it means to pee" - Urethra Franklin`,
    `I hate broken down white cars on the side of the hwy. They look just like cops when I'm speeding & shitting my pants is getting really old.`,
    `I just assume everyone on my Christmas list has been naughty. Makes things simpler.`,
    `I wonder if people in China call their crappy plates their "America collection."`,
    `I've never jumped onto a departing ferry or had a woman adjust my tie from behind me, you movie liars.`,
    `I really gotta start saying "congratulations" I instead of "are you keeping it?"`,
    `turning older than 12 years old was the biggest mistake of my life`,
    `I'm on a whiskey diet. You should try it, I've lost 3 days already.`,
    `We don't have mistletoe at Christmas so we just kiss under the influence.`,
    `Goodnight computer *instantly grabs phone*`,
    `When I was child we had to look things up in dictionary or encyclopedia, uphill both ways in the snow`,
    `I can never decide whether to slam on my breaks or go through a yellow light, so I do an annoying combination.`
]

const reactions = [
    `Some of my most meaningful relationships started because I was too lazy to leave the room.`,
    `When I’m in the car and a sad song comes on the radio, I stare out the window and act like I’m in a movie.`,
    `I hear they finally plugged Bristol Palin. Oh, the other BP. Ok, I'll shut up now.`,
    `The secret to juggling chainsaws is making sure people don't see your lips move when you make the chainsaw sounds.`,
    `I hated my job at medieval times because I always got stuck working on the knight shift`,
    `I loathe earlier versions of myself as though they were separate people.`,
    `The best way to eat a salad is to order a pizza instead.`,
    `have u ever tried to break a crush by looking at their Facebook like PLEASE post abt Mumford & sons or smth so I can be free from this curse`,
    `How many decades of knowing someone before it's rude to ask what their name is?`,
    `*poops blood* "What the heck I haven't eaten blood in weeks"`,
    `FACT: If you can trick a British person into saying their name backwards, they have to become your butler.`,
    `> Unsubscribe from LinkedIn > Delete email account > Sell house, live in woods > Find bottle in river > Has note inside > It's from LinkedIn`,
    `If you're havin AutoCorrect problems I feel bad for you son. I got 99 parabolas bit s butch Saint omg.`,
    `Need an ark? i Noah guy`,
    `Haters gonna have a valid point sometimes.`
]

const randomArrEl = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateUsername = () => `${randomArrEl(usernames)}_${randomArrEl(usernames)}`;

const generateEmail = () => `${generateUsername()}${randomArrEl(emailDomains)}`;

export { generateUsername, generateEmail, thoughts, reactions, randomArrEl };