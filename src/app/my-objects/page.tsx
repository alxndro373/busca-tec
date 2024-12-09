"use client"

import { objectStore } from "@/store/objectStore"
import { useEffect, useState } from "react"
import ObjectsList from "@/components/objects"
import { useSession } from "next-auth/react"
import { getUserWithEmail } from "@/actions/userAction"
import Loader from "@/components/loader"

export default function MyObjects() {
  const [loading, setLoading] = useState<string>("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading("")
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const { recuperateObjectsByUser } = objectStore()
  const { data: session } = useSession()

  useEffect(() => {
    const getUserWithObjects = async () => {
      if (session?.user?.email) {
        const user = await getUserWithEmail(session.user.email)
        if (user[0]?.id_user) {
          await recuperateObjectsByUser(user[0]?.id_user)
        }
      }
    }
    if (session?.user?.email) {
      getUserWithObjects()
    }
  }, [session?.user?.email])

  const { objectsByUser } = objectStore()

  return (
    <main>
      <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center mb-5">
        Mis objetos
      </h1>

      {loading ? (
        <Loader />
      ) : objectsByUser.length > 0 ? (
        <ObjectsList
          objects={objectsByUser}
          buttonText="Reclamado"
          option="usuario"
        />
      ) : (
        <p className="text-center">No tienes objetos publicados</p>
      )}
    </main>
  )
}
