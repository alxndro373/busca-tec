"use client"

import { useState, useEffect } from "react"
import { objectStore } from "@/store/objectStore"
import ObjectsList from "@/components/objects"
import { useSession } from "next-auth/react"
import { getUserWithEmail } from "@/actions/userAction"
import Loader from "@/components/loader"

export default function MyObjects() {
  const [loading, setLoading] = useState<boolean>(true)
  const { recuperateObjectsByUser, objectsByUser } = objectStore()
  const { data: session } = useSession()

  const handleObjectChange = async () => {
    if (session?.user?.email) {
      setLoading(true)
      try {
        const user = await getUserWithEmail(session.user.email)
        if (user[0]?.id_user) {
          await recuperateObjectsByUser(user[0]?.id_user)
        }
      } catch (error) {
        console.error("Error al actualizar los objetos:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (session?.user?.email) {
          const user = await getUserWithEmail(session.user.email)
          if (user[0]?.id_user) {
            await recuperateObjectsByUser(user[0]?.id_user)
          }
        }
      } catch (error) {
        console.error("Error al recuperar los objetos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [session?.user?.email, recuperateObjectsByUser])

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
          onObjectChange={handleObjectChange} // Llama esta función cuando un objeto se agrega/elimina
        />
      ) : (
        <p className="text-center">No tienes objetos publicados</p>
      )}
    </main>
  )
}
