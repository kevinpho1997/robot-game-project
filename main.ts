sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (!(invincible)) {
        info.changeLifeBy(-1)
        invincible = true
        otherSprite.destroy()
        for (let index = 0; index < 5; index++) {
            playerSprite.setFlag(SpriteFlag.Invisible, true)
            pause(100)
            playerSprite.setFlag(SpriteFlag.Invisible, false)
            pause(100)
        }
        invincible = false
    }
})
let side = 0
let enemySpeedMax = 0
let enemySpeedMin = 0
let enemy: Sprite = null
let invincible = false
let playerSprite: Sprite = null
scene.setBackgroundImage(assets.image`background`)
playerSprite = sprites.create(assets.image`playerDroneUp`, SpriteKind.Player)
playerSprite.setScale(0.6, ScaleAnchor.Middle)
controller.moveSprite(playerSprite, 100, 100)
let enemyList = [
assets.image`normalRock`,
assets.image`triangleRock`,
assets.image`roundRock`,
assets.image`squareRock`
]
let oreList = [
assets.image`normalOre`,
assets.image`ore3`,
assets.image`ore2`,
assets.image`ore1`
]
let playerDirections = [
assets.image`playerDroneRight`,
assets.image`playerDroneDown`,
assets.image`playerDroneLeft`,
assets.image`playerDroneUp`
]
info.setLife(3)
game.onUpdate(function () {
    if (playerSprite.vx != 0 || playerSprite.vy != 0) {
        if (Math.abs(playerSprite.vx) > Math.abs(playerSprite.vy)) {
            if (playerSprite.vx > 0) {
                playerSprite.setImage(playerDirections[0])
            } else {
                playerSprite.setImage(playerDirections[2])
            }
        } else {
            if (playerSprite.vy > 0) {
                playerSprite.setImage(playerDirections[1])
            } else {
                playerSprite.setImage(playerDirections[3])
            }
        }
    }
})
game.onUpdateInterval(1000, function () {
    enemy = sprites.create(enemyList[randint(0, enemyList.length - 1)], SpriteKind.Enemy)
    enemy.setScale(0.3, ScaleAnchor.Middle)
    enemySpeedMin = 10
    enemySpeedMax = 30
    side = randint(0, 3)
    if (side == 0) {
        enemy.setPosition(randint(0, 160), -10)
        enemy.vy = randint(enemySpeedMin, enemySpeedMax)
    } else if (side == 1) {
        enemy.setPosition(randint(0, 160), 130)
        enemy.vy = randint(enemySpeedMin, enemySpeedMax)
    } else if (side == 2) {
        enemy.setPosition(-10, randint(0, 120))
        enemy.vx = randint(enemySpeedMin, enemySpeedMax)
    } else {
        enemy.setPosition(170, randint(0, 120))
        enemy.vx = randint(enemySpeedMin, enemySpeedMax)
    }
})
