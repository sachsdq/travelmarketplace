import { Button, Card, CardContent, Typography, styled } from '@mui/material'
import React from 'react'

const TrigleImg = styled("img")({
    right:0,
    bottom:0,
    height:170,
    position:"absolute"
})

const TrophyImg = styled("img")({
    right:36,
    bottom:20,
    height:98,
    position:"absolute"
})

const Achivement = () => {
  return (
    <div>
        <Card sx={{position:"relative", bgcolor:"#242B2E", color:"white"}}>
            <CardContent>
                <Typography variant='h6' sx={{letterSpacing:".25px"}}>
                    Travel Market Place
                </Typography>
                <Typography variant='body2'>Congratulations !!!</Typography>
                <Typography variant='h5' sx={{my:3.1}}> 123.4k</Typography>
                <Button size='small' variant='contained'>View Sales</Button>
                <TrigleImg src=''></TrigleImg>
                <TrophyImg src='https://img.freepik.com/free-vector/trophy-flat-style_78370-3222.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716595200&semt=ais_userhttps://img.freepik.com/free-vector/trophy-flat-style_78370-3222.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716595200&semt=ais_user'></TrophyImg>
            </CardContent>
        </Card>
    </div>
  )
}

export default Achivement