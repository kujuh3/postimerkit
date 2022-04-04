import { Button, Container, Typography } from "@material-ui/core"
import { useState, useEffect } from 'react';
import { Grid, CardActionArea } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    listarivi : {
                    borderBottom : "solid 1px #ccc",
                    paddingBottom : "10px",
                    marginBottom : "20px"
                },
                 card: {
                  minWidth: 275,
                  margin: "5px",
                },
                bullet: {
                  display: 'inline-block',
                  margin: '0 2px',
                  transform: 'scale(0.8)',
                },
                title: {
                  marginBottom: 16,
                  fontSize: 14,
                },
                pos: {
                  marginBottom: 12,
                },
                img: {
                    width: "70%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }
});


function Tarkastelu(props) {
    const tyylit = useStyles();
    const tiedot = require('./postimerkit.json');
    //haetaan taas kerran tiedosto
    //haetiedot funktiolla verrataan haettujen tietojen idseen
    //ja returnilla palautus
    function haeTiedot(id){
       return tiedot.filter(item => {
           return item.postimerkki_id === id
       })
    }

    //muuttujaan idtä vastaava objekti
    const [detailit, setDetailit] = useState(haeTiedot(props.match.params.id));
    //ja useeffectillä asetetaan kun params.id muuttuu
    useEffect(() => {
        setDetailit(haeTiedot(props.match.params.id));
    },[props.match.params.id]);

    return ( 
            <Container>
            <Grid container spacing={24}>
            {detailit.map((lista) => {
        return (
                  <Grid key={lista.postimerkki_id} item xs={12} >
                    <Card className={tyylit.card}>
                      <CardActionArea >
                        <CardMedia
                        component="img"
                        className={tyylit.img}
                        image={lista.kuvan_url}>
                        </CardMedia>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                         {lista.merkin_nimi}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Ilmestymispäivä: {lista.ilmestymispaiva}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Valuutta: {lista.valuutta}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Käytön päättymispäivä: {lista.kayton_paattyminen}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Väri: {lista.merkin_vari}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Painosmäärä: {lista.painosmaara}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Painopaikka: {lista.painopaikka}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Taiteilija: {lista.taiteilija}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Asiasanat: {lista.asiasanat}
                        </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
      })}
      </Grid>

            <Button 
                component={Link} to="/selaa"
                variant="contained"
                color="primary"
                style={{ marginTop : "10px"}}
            >Palaa takaisin        
            </Button>
            </Container>
          )
}
export default Tarkastelu;