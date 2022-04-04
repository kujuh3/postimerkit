import { useState, useEffect } from 'react';
import { Grid, Button, Typography, Container, CardActionArea, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from "react-router-dom";
import { BiLastPage, BiFirstPage } from 'react-icons/bi'

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
                    tag: {
                      float: "right",

                    }
    });

function Selaa(props) {
    //tämä osio voi olla erittäin raskasta luettavaa
    //painin localstorageen tallentamisen kanssa niin käsittämättömän
    //kauan että koodi on ihan sekaisin kaiken sen jäljiltä
    //kun yritin saada sitä toimimaan järkevästi
    //olisi varmaankin pitänyt hoitaa 20 per sivu printtaus jotenkin useEffectin avulla
    const tyylit = useStyles();

    //haetaan tiedosto
    const tiedot = require('./postimerkit.json');

    //liitetään dataarrayihin
    const [data, setData] = useState({
      postimerkit : tiedot,
    });
    
    //20 merkkiä per sivu muuttujat
    const [maara, setMaara] = useState(20);
    const [maara1, setMaara1] = useState(0);

    //aluksi meinasin props.history logiikalla jotenkin tehdä niin etteivät
    //muuttujat resettaisi jos arvo on PUSH
    //mutta en saanut järkeiltyä miten tämän tekisi

    //useeffectillä ekan kerran ladattaessa haetaan localstoragesta 
    //jotta ei mene nollille
    useEffect(() => {
      const check = localStorage.getItem("maara1");
      const check2 = localStorage.getItem("maara11");
      if (check){
      setMaara(parseInt(check));}
      if(check2){
      setMaara1(parseInt(check2));}
    }, []);


    //slicellä määrä muuttujien perusteella otetaan 20 kerrallaan
    let listaus = data.postimerkit.slice(maara1,maara);

    //useeffectillä asetetaan localstorageen ja iffillä määritetään näkyykö painike
    useEffect(() => { 
      localStorage.setItem("maara1", maara);
      localStorage.setItem("maara11", maara1);
  }, [maara, maara1]);

  //lisätään tai vähennettään listauksesta
  function edelliset(){
    setMaara(maara-20);
    setMaara1(maara1-20);
  }
  function seuraavat(){
    setMaara(maara+20);
    setMaara1(maara1+20);
  }

  const firstPage = () => {
    setMaara1(0);
    setMaara(20);
  }

  const lastPage = () => {
    setMaara1(2300);
    setMaara(2320);
  }

  return (
    <Container style={{
                        paddingTop : "10px",
                     }}>
      <Grid container spacing={2} columns={12} style={{textAlign:'center'}}>
        <Grid item xs={6}>
        {(maara1>19)
        ?<> 
        <IconButton
        variant="contained"
        color="secondary"
        onClick={() => { firstPage() }}
        >
          <BiFirstPage/>
        </IconButton>
        <Button
        variant="contained"
        color="secondary"
        onClick={() => { edelliset() }}
        >
        Näytä edelliset 20 merkkiä
        </Button>
        </>  
        : ""
        }
        </Grid>
        <Grid item xs={6}>
        {(maara<2320) 
        ?<> 
        <Button
          variant="contained"
          color="secondary"
          onClick={() => { seuraavat() }}
        >
          Näytä seuraavat 20 merkkiä
        </Button>
        <IconButton
        variant="contained"
        color="secondary"
        onClick={() => { lastPage() }}
        >
          <BiLastPage/>
        </IconButton>
        </>
        : ""
        }
        </Grid>
      </Grid>
      <Grid container spacing={24}>
        {listaus.map((lista) => {
        return (
                  <Grid key={lista.postimerkki_id} item xs={3} >
                    <Card className={tyylit.card} component={Link}
                        to={`/selaa/${lista.postimerkki_id}`}>
                      <CardActionArea >
                        <CardMedia
                        component="img"
                        height="140"
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
                         Nimellisarvo: {lista.nimellisarvo}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Valuutta: {lista.valuutta}
                        </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
      })}
      </Grid>
    </Container>
  );
}


export default Selaa;
