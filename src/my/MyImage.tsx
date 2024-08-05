import { COLLECTION } from '@constants/index'
import styled from '@emotion/styled'
import useUser from '@hooks/auth/useUser'
import { useSetRecoilState } from 'recoil'

import { userAtom } from '@atoms/user'
import { app, storage, store } from '@remote/firebase'
import { getAuth, updateProfile } from 'firebase/auth'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { ChangeEvent } from 'react'

function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode: 'default' | 'upload'
}) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const currentUser = getAuth(app).currentUser
    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)

    const uploadRef = await uploadBytes(storageRef, files[0])

    const downloadUrl = await getDownloadURL(uploadRef.ref)

    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })
    console.log(downloadUrl)
    await updateDoc(doc(collection(store, COLLECTION.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    console.log('upload', uploadRef)
    console.log('downloadUrl', downloadUrl)

    setUser({
      ...user,
      photoURL: downloadUrl,
    })
  }
  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn0.iconfinder.com/data/icons/phosphor-light-vol-4/256/user-circle-light-512.png'
        }
        alt="유저의 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}
const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }
  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export default MyImage
