import { Button, Container, Typography } from "@material-ui/core"

function Etusivu() {
   
    return (
            <Container>

                <Typography 
                    variant="h2" 
                    style={{
                            marginTop : "10px"
                            }}
                >
                Tervetuloa!</Typography>

                <Typography 
                    variant="h4" 
                    style={{
                            marginTop : "10px"
                           }}
                >
                Tämä demo toimii yksinkertaisena esimerkkinä reactin reitityksistä.</Typography>
  
                        <br></br>
                <Typography 
                    variant="h5" 
                    style={{
                            marginTop : "10px"
                           }}
                >
                Sovellus lataa .JSON tiedostosta postimerkkejä. Jokaisessa JSON objektissa on tietoja postimerkistä ja linkki postimerkin kuvaan URL osoitteena. 
                Jokaisen postimerkin voi avata tarkasteluun, jolloin postimerkistä näytetään lisätiedot.</Typography>        
            </Container>
          )
}
export default Etusivu;