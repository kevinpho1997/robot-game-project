function setupPlayerMovement () {
    controller.moveSprite(playerSprite, 100, 100)
}
let playerSprite: Sprite = null
scene.setBackgroundImage(assets.image`background`)
playerSprite = sprites.create(assets.image`playerDroneUp`, SpriteKind.Player)
playerSprite.setScale(0.6, ScaleAnchor.Middle)
setupPlayerMovement()
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
