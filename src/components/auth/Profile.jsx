const Profile = () => {

    const token = JSON.parse(localStorage.getItem('Token'))

  return(
      <>
          <p className="text-center text-blue-600 text-6xl font-extrabold">{`This is  ${token.user.email}  profile...!`}</p>
      </>
  )
}
export default Profile;