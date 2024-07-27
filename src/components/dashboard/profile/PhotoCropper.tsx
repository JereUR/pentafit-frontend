'use client'

import React, { useRef, useState } from 'react'
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  PercentCrop,
  PixelCrop
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css' // Asegúrate de importar los estilos

import { useToast } from 'components/ui/use-toast'
import ErrorText from '../global/ErrorText'
import setCanvasPreview from '../business/setCanvasPreview'
import Loader from '@/components/Loader'

interface Props {
  closeModal: () => void
  updateProfilePhoto: ({ imgSrc }: { imgSrc: string }) => Promise<boolean>
  loadingUser: boolean
}

const ASPECT_RATIO = 1
const MIN_DIMENSION = 150

const PhotoCropper: React.FC<Props> = ({
  closeModal,
  updateProfilePhoto,
  loadingUser
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState<PixelCrop | PercentCrop>()
  const [error, setError] = useState('')
  const { toast } = useToast()

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const imageElement = new Image()
      const imageUrl = reader.result?.toString() || ''
      imageElement.src = imageUrl
      imageElement.addEventListener('load', (e: Event) => {
        if (error) setError('')
        const { naturalHeight, naturalWidth } =
          e.currentTarget as HTMLImageElement
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError('La imagen debe tener al menos 150x150 píxeles.')
          return setImgSrc('')
        }
      })

      setImgSrc(imageUrl)
    })
    reader.readAsDataURL(file)
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100

    const crop = makeAspectCrop(
      { unit: '%', width: cropWidthInPercent },
      ASPECT_RATIO,
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  const handleCrop = () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      const pixelCrop = convertToPixelCrop(
        crop,
        imgRef.current.width,
        imgRef.current.height
      )
      setCanvasPreview(imgRef.current, previewCanvasRef.current, pixelCrop)

      previewCanvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'cropped-logo.png', {
            type: 'image/png'
          })
          const imgSrc = URL.createObjectURL(file)

          updatePhoto(imgSrc)
        } else {
          toast({
            variant: 'destructive',
            title: 'Oh no! Algo salió mal.',
            description: 'Blob is null.'
          })
        }
      })
    }
  }

  const updatePhoto = async (imgSrc: string) => {
    const res = await updateProfilePhoto({ imgSrc })
    if (res) closeModal()
  }

  return (
    <>
      <label className="block w-fit m-6">
        <span className="sr-only">Seleccionar tu nueva foto de perfil</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:cursor-pointer file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-primary-orange-600 hover:file:bg-gray-600"
        />
      </label>
      {error && <ErrorText text={error}></ErrorText>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(percentCrop) => setCrop(percentCrop)}
            className="mt-10"
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            {' '}
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: '70vh' }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            type="button"
            className="text-white font-mono text-lg py-2 px-4 rounded-2xl mt-4 bg-primary-orange-600 hover:bg-primary-orange-700"
            onClick={handleCrop}
          >
            {loadingUser ? (
              <Loader className="-mb-4 ml-5" />
            ) : (
              'Actualizar foto de perfil'
            )}
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: 'none',
            border: '1px solid black',
            objectFit: 'contain',
            width: 150,
            height: 150
          }}
        />
      )}
    </>
  )
}

export default PhotoCropper
