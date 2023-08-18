import { useEffect, useRef } from "react";
import { Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
function Profile(props) {
  const NameRef = useRef();
  const ProfileUrlRef = useRef();
  useEffect(() => {
    async function PageLoader() {
      const token = localStorage.getItem("token");
      const config = {
        method: "Post",
        data: {
          idToken: token,
        },
        url: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await axios(config);
        const data=res.data.users[0]
        NameRef.current.value=data.displayName
        ProfileUrlRef.current.value=data.photoUrl

      } catch (err) {
        props.error(err.response.data.error.message, "Opps Something Went Wrong");
      }
    }
    PageLoader();
  }, []);
  async function SubmitHandler(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      method: "Post",
      data: {
        idToken: token,
        displayName: NameRef.current.value,
        photoUrl: ProfileUrlRef.current.value,
        returnSecureToken: true,
      },
      url: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios(config);
      console.log(res);
    } catch (err) {
      props.error(err.response.data.error.message, "Opps Something Went Wrong");
    }
  }
  return (
    <div>
      <Container fluid className="text-center  mb-1 bg-success pt-1 pb-1">
        <h1 style={{ fontSize: "30px" }}>
          Winner never quits. Quitters never win.
        </h1>
      </Container>
      <div
        style={{ float: "right", borderRadius: "20px" }}
        className="bg-danger-subtle p-2 "
      >
        <span style={{ float: "left" }}>
          Your profile is <b>84%</b> completed. A complete Profile has <br />
          highr=er chances of landing a bob.
          <NavLink
            to="/profile"
            style={{
              marginLeft: "5px",
              marginRight: "10px",
              color: "red",
            }}
          >
            Complete now
          </NavLink>
        </span>
      </div>
      <Container
        fluid
        className=" p-2 text-center"
        style={{ marginTop: "70px" }}
      >
        <h3 className="mb-4">Contact Details</h3>
        <form onSubmit={SubmitHandler}>
          <div className="mb-4">
            <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEX////4+Pi3ubtvcnZNUVU+Q0cpLjLr6+x3en0sMTYkKS59gIORk5aUl5n8/Pzw8PFTV1tbX2Pc3d5DSEzn5+g3PECLjpFKTlKFh4qxs7XCxMUwNTq/wcLh4uPV1tZzd3o/Q0jOz9CmqKpjZ2qfoaSrd37mAAABPUlEQVR4AW3TBZKEMBAF0B8GCHzcnbW5/xm30qEyknklcU/DgQpuYRTHUXgLFHw6SemkmcYrlcd8kRYlnlQ1PU0Fp434Qde75Qd+1FUQKiRZjyGfTGNjKhWMmSQXYO3Ibao3MlqBnSRzADhk/ycAdcqclSSHnEUD+KLt8KalMQMqpl3izU5jKxHQGCq8Ud80fq4VfuFZaIyQO4wVPEre5g+RrIAPJrkQSL8OPjv3htQmH8guU5uwgseeP7ITMYBnpdFgvlJPcx0zoLjjzS/FDrVRvH6xsqDYlLx29huRUaFx6YuI1mhKMbddf9trEzca7rmRk/FxpiRXiJO8FDBURyb4yfO7glC8TOpacmAc4ElMEWlc2oGckjwvYVFEB5wjouE6uLBwquypQym/scKrM4njElYaJy182q15aDj/oQMZkS8JH3IAAAAASUVORK5CYII="></Image>
            <b style={{ marginLeft: "20px" }}>Full Name:</b>
            <input
              style={{ marginLeft: "20px", width: "300px" }}
              type="text"
              aria-label="Username"
              ref={NameRef}
            />

            <Image
              style={{ height: "30px", marginLeft: "50px" }}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAAYFBMVEX///8AAADz8/P4+Pi1tbXExMTPz895eXnl5eXs7OzMzMxpaWna2tqysrI9PT0kJCRJSUliYmKOjo4ICAi7u7stLS1QUFCmpqYPDw9wcHAVFRU2NjYaGhqZmZlWVlZ/f39oz42GAAAFy0lEQVRogcVb6YKCIBBmQ03NO601S9//LTeNAZUBtbVmfhUgH8OcXIxtJx65cXHMk/T3/HP+TZP8WMRudHijp83AzrG5/2B0a45OxD8HHbh1ggIrSmo3+AQ0L+t0AfpF6ancewb8YhUyUOHviF1mm7B7ysqdsN1qM3ZPlbsH9uUt7J4u/8X3c2PfuSt+uOY2p3/J/2FmzGVc/OLMNTd7vI3tzUysU0xentUH8bt3cko8eTf9KPXeA58aWXY9eGocbIbOFKbHr1MTKd7ADiZdXFzOgmra3wRdjbUKGJ+qarbZ/YW38eeD8tYTzufoivu6/+eOB38Lt4Ffx2N3hiIH/rYMRWetoX1P1y3gR11sgPVTQaM5OpOSmc/Gk47rwUcGnEWi7AQl0oQ1dB+anERBNJr+fCU2P6lvCghXEZTEsp2GzmJoBEPmI7s5rYp8XHF+U6EClPikGurocoIusqRU2puvgVecN8pPlqLoPHKdCLp/FmVq2H6juF8GV5zXqpBDThOPWiLocu6TEZ/SUpdlr7S9wzodN8XQGTZMpfsLmj+y8ySW45esT7wGih5qzPN4lAxa7T78GVNyFV2A1LNJYxSdgZEJyfPrNBG1eL3g9jOjx+CiUdYN6JL5oUMtRN/MPh9L31qHQ2ybsm5Al514zGmR/madKDLkrXfwoLNEyYAOqUZlSMANAVeG76xDP7vM2hvQGZ4IdnJi8XQDxnrzmYfOWRlMvBWKzgM0/W495oNSpRi4VJBBW1H85zqliOVyUeV1YjRRXJzQ6W4HdsFysFxPBiiQS1RjHb0GkXeP2IEA7jjxo8vNy6waYo7UKz3TBQ+bqdkNHkuLxmVKHsrEOMhE87gyKY7GpYcQn8qVlJ7CiVLIMD1fZoCiavbgGXpeQ5p2w9zPzEeyrkkkNvS8hmKtN6iZMg8OxdHai0m5l91aJUi68o6yyFSqWY0LwRgSrTkk8X285eGjbm0L2rSti7DXWuGuKt2pAwvjBTYoo77oDGc1PPA9p+jyNksgaWmSrM27wvF86Y1AkHpEg5qRuwdb12cK9OSu70hx+MrX8zUIlohfAfVWNg+qiKy3M5NIzH6+p0TjEAiYl8YFLjPTmTjcjUxY0R/mKQMpAxjoHJL2gLVjKYkNHdQFiWeQvIHeQQ6NpB3C2lNsD8KG7gsXqVs8C8RnImUO0snfCXVGdbSjg3JhSayIXumLWdADbI+rMndiRxcQFVIFgnbHDXUny6RnRBNhK/p1udNhriFZx9Y5YNJoMmRFB3XFFEbo2ZDyQ9hDFEQKBd34sqLDuLEtOwhcfTAXjv+MIYj5S1AAK/qhMcsM1pp9SDua9QOcIL76s6JDroTmzyNdbtRPjY4j/diIXlu6FXWN8qWY2MHL4wsAO7qYNnTpIgT/9MOgdJha88oysgV0gVBhGxZgEBGoNepLIfzge812dDAXDB38sAtjROKb6j9C6pbQI0stuJgY5NMijWRAwPu3o8O36Iq5BX2yqTWMH99ssqOD1NB5kwZhs8twB3R0s0L6ESGCBz9oxEU0Ogd63ZNkXofWBsKhlVjHIvVJ2H9WSv+llP0Sov+y83Kjj9GZLbf5IBHzTit3Wp2ntXdaX0fr52ljHG18p81taPM6ypyWy3weVfqP5/PEa5kV67jmc+s42jUs7fqddu9izb4NqvT77Nt8cs+qQ6qme1Zy6kn264j3Kmn3ab+6Rw0TrZwg7f68LPr82QSwfkHKvncuM+Hz22dSzaSU9jyO9izSfA773oXSF60+h5XHI984g9aDOe35O+3dA+J7F8R3Tmjv2+x+16jcdNeI+J4V7R2zHe/XKae1/n4d8d1C4nuVxHdKie/T0t4lZrT3qBnxHXLi+/OztwPJl98OzN9NZN99N8Fo34ww4vcyjPatECN+J8Vo34gN+G++j9vtfd52/rM9+AaifBfZ0/o3ofXub0IHInwP+6L+LXCCvwW+f/gtsBrCXu+g/wCj8mJ9PwXwbAAAAABJRU5ErkJggg=="
            ></Image>
            <b style={{ marginLeft: "20px" }}>Profile Photo URL:</b>
            <input
              style={{ marginLeft: "20px", width: "300px" }}
              type="text"
              aria-label="Username"
              ref={ProfileUrlRef}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginRight: "10px" }}
          >
            Submit
          </button>
          <NavLink to="/expense">
            <button className="btn btn-danger" href="/expense">
              close
            </button>
          </NavLink>
        </form>
      </Container>
    </div>
  );
}
export default Profile;
