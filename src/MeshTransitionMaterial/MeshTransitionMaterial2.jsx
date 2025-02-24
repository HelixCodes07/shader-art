/* eslint-disable react/display-name */
import React, { useEffect, useMemo, forwardRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import CSM from 'three-custom-shader-material'
import FragTransition2 from './shaders/FragTransition2'
import Vert from './shaders/Vert'

const TransitionMaterial2 = forwardRef((props, ref) => {
  const { size } = useThree()
  let transitionDuration = 0.85
  let transitionStartTime = 0
  let isTransitioning = true

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0.0 },
      prevColor: { value: new THREE.Color('#fff') },
      newColor: { value: new THREE.Color(props.transitionColor) },
      iResolution: {
        value: new THREE.Vector2(
          size.width * Math.min(window.devicePixelRatio, 2),
          size.height * Math.min(window.devicePixelRatio, 2)
        ),
      },
    }),
    []
  )

  const baseMaterialCustom = useMemo(() => {
    const { transitionColor, ...oP } = props

    return new THREE.MeshPhysicalMaterial({
      ...oP,
      roughness : 0.329,
      metalness : 1,
      specularIntensity : 0.5,
    })
  }, [props])

  useEffect(() => {
    transitionStartTime = 0
    uniforms.newColor.value.set(props.transitionColor)
    isTransitioning = true
  }, [props.transitionColor])

  useFrame((state, delta) => {
    if (isTransitioning) {
      const elapsedTransitionTime = (transitionStartTime += delta)
      let transitionProgress = elapsedTransitionTime / transitionDuration

      if (transitionProgress >= transitionDuration) {
        transitionProgress = 0
        uniforms.prevColor.value.copy(uniforms.newColor.value)
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
      fragmentShader={FragTransition2}
      ref={ref}
      silent
    />
  )
})

export default TransitionMaterial2
