import React, { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import CSM from 'three-custom-shader-material'
import FragTransition3 from './shaders/FragTransition3'
import Vert from './shaders/Vert'

export default function TransitionMaterial3(props) {
  const { size } = useThree()
  let transitionDuration = 2
  let transitionStartTime = 0
  let isTransitioning = true
  let newInternalColor = new THREE.Color(props.transitionColor)

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0.0 },
      prevColor: { value: newInternalColor },
      newColor: { value: newInternalColor },
      iResolution: {
        value: new THREE.Vector2(
          size.width * Math.min(window.devicePixelRatio, 2),
          size.height * Math.min(window.devicePixelRatio, 2)
        ),
      },
    }),
    []
  )

  let fragmentShader = `${FragTransition3}`

  const baseMaterialCustom = useMemo(() => {
    const { transitionColor, ...oP } = props

    return new THREE.MeshPhysicalMaterial({
      ...oP,
      roughness : 0.25,
      metalness : 1,
      specularIntensity : 0.5,
    })
  }, [props])

  useEffect(() => {
    transitionStartTime = 0
    uniforms.newColor.value = newInternalColor.set(props.transitionColor)
    isTransitioning = true
  }, [props.transitionColor])

  useFrame((state, delta) => {
    if (isTransitioning) {
      const elapsedTransitionTime = (transitionStartTime += delta)
      let transitionProgress = elapsedTransitionTime / transitionDuration

      if (transitionProgress >= transitionDuration) {
        transitionProgress = 0
        uniforms.prevColor.value = uniforms.newColor.value
        isTransitioning = false
      }

      uniforms.uProgress.value = transitionProgress
    }
  })

  useEffect(() => {
    uniforms.iResolution.value.set(
      size.width * Math.min(window.devicePixelRatio, 2),
      size.height * Math.min(window.devicePixelRatio, 2)
    )
  }, [size])

  return (
    <CSM
      baseMaterial={baseMaterialCustom}
      uniforms={uniforms}
      vertexShader={Vert}
      fragmentShader={fragmentShader}
      silent
    />
  )
}
