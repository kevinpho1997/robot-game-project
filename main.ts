namespace SpriteKind {
    export const Laser = SpriteKind.create()
    export const Ore = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ore, function (sprite, otherSprite) {
    if (otherSprite.image.equals(assets.image`normalOre`)) {
        info.changeScoreBy(10)
    } else if (otherSprite.image.equals(assets.image`ore3`)) {
        info.changeScoreBy(20)
    } else if (otherSprite.image.equals(assets.image`ore2`)) {
        info.changeScoreBy(30)
    } else if (otherSprite.image.equals(assets.image`ore1`)) {
        info.changeScoreBy(40)
    }
    sprites.destroy(otherSprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laserVx = 0
    laserVy = 0
    if (droneDirection == 0) {
        laserVx = 150
    } else if (droneDirection == 1) {
        laserVy = 150
    } else if (droneDirection == 2) {
        laserVx = -150
    } else {
        laserVy = -150
    }
    if (droneDirection == 0 || droneDirection == 2) {
        laser = sprites.createProjectileFromSprite(assets.image`miningLaserX`, playerSprite, laserVx, laserVy)
    } else {
        laser = sprites.createProjectileFromSprite(assets.image`miningLaserY`, playerSprite, laserVx, laserVy)
    }
    laser.setKind(SpriteKind.Laser)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Laser, SpriteKind.Enemy, function (laser, enemy) {
    tempIndex = spawnedRocks.indexOf(enemy)
    if (tempIndex >= 0) {
        ore = sprites.create(oreList[rockOreIndices[tempIndex]], SpriteKind.Ore)
        ore.setPosition(enemy.x, enemy.y)
        spawnedRocks.removeAt(tempIndex)
        rockOreIndices.removeAt(tempIndex)
    }
    laser.destroy()
    enemy.destroy()
})
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
let enemyIndex = 0
let invincible = false
let rockOreIndices: number[] = []
let ore: Sprite = null
let spawnedRocks: Sprite[] = []
let tempIndex = 0
let laser: Sprite = null
let droneDirection = 0
let laserVy = 0
let laserVx = 0
let oreList: Image[] = []
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
oreList = [
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
info.startCountdown(60)
game.onUpdate(function () {
    if (playerSprite.vx != 0 || playerSprite.vy != 0) {
        if (Math.abs(playerSprite.vx) > Math.abs(playerSprite.vy)) {
            if (playerSprite.vx > 0) {
                playerSprite.setImage(playerDirections[0])
                droneDirection = 0
            } else {
                playerSprite.setImage(playerDirections[2])
                droneDirection = 2
            }
        } else {
            if (playerSprite.vy > 0) {
                playerSprite.setImage(playerDirections[1])
                droneDirection = 1
            } else {
                playerSprite.setImage(playerDirections[3])
                droneDirection = 3
            }
        }
    }
})
game.onUpdateInterval(1000, function () {
    enemyIndex = randint(0, enemyList.length - 1)
    enemy = sprites.create(enemyList[enemyIndex], SpriteKind.Enemy)
    spawnedRocks.push(enemy)
    rockOreIndices.push(enemyIndex)
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
