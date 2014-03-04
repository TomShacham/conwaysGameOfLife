Conways Game of Life
---

Hosted on heroku (+ uses newrelic) at http://conways-game-of-life-on-node.herokuapp.com/

Tech wise this is a Node.js application that uses Express.js and is essentially powered by jQuery (it's doing most of the business logic). Look in public/js/client.js for the crux of it.

Heavy use of D3 to plot evolution of eco-system over time. 

You can read the [insightful wikipedia page] but basically this demonstrates the idea of chaos theory.

Chaos theory stripped down says something like.. 'for very small changes in the initial conditions for a system, extremely different behaviour / characteristics / output may be observed'.

For example, the weather on Earth is chaotic. You can generally predict where cloud formations and clusters will go and how they will interact or collide with others (with huge computational power) but for all the zillions of particles that are flying at each other, you can't say for sure and besides (this is what's really chaotic about it) two seemingly very similar situations may in fact end very differently like... 5 hours later... because a tiny gust of hot air here or there then caused a chain reaction that caused another, that causes another, and so on.

Another example, imagine two pendulums swing side by side so that they are almost touching. If they are released to swing at exactly the same time, they will swing in unison and never touch each other, swinging back and forth until the friction at the hinge of the arm of the pendulum slow both pendulums to a halt. But what if the first pendulum is started a fraction of a second after the second pendulum? They will collide as the second pendulum starts to swing back in the opposite direction, possibly collide again as they both swing back again, and again.. and again.. until maybe they smash each other head first. Point being, for a tiny difference in the starting condition, an entirely different set of events is observed.

The point of Conway's game of life is to show that with 4 simple rules, you can create a kind of ecosystem (and this is how populations of animals work) whereby small differences in two initial setups can mean that the game plays out wildly differently.

Enjoy

  [insightful wikipedia page]: http://en.wikipedia.org/wiki/Conway's_Game_of_Life
