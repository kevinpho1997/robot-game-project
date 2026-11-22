scene.setBackgroundImage(assets.image`background`)
let playerSprite = sprites.create(assets.image`playerDrone`, SpriteKind.Player)
playerSprite.setScale(0.6, ScaleAnchor.Middle)
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
