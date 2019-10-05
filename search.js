import React, {Component} from 'react';
import axios from "axios";

import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
  } from "reactstrap";

class Search extends Component {

    constructor() {
        super();
        this.state = {
          //username: "",
         // passwordHash: "",
          planetData: null,
          searchText: null
        };
      //  this.onChange = this.onChange.bind(this);
       // this.onSubmit = this.onSubmit.bind(this);
      }

    onSearchHandler = (event) => {
        this.setState( { searchText: event.target.value },() =>{
            if(this.state.searchText) {
                this.searchPopulation(this.state.searchText)
            }
        } );

    } 

    searchPopulation = (searchData) => {
        axios
          .get("https://swapi.co/api/planets/")
          .then(res => {

            //console.log(res.data.results);
            let searchPlanets = res.data.results.filter((val) => {
                //console.log(val.name);
                if(val.name.search(searchData) > -1 ) {
                    return val;
                };
            });
           let sortedArr = searchPlanets.sort((a,b) => {
               //console.log(a.population);
             //  console.log(b.population);
                   return a.population -  b.population;
            }); 
            //console.log(sortedArr);

            this.setState({planetData:sortedArr})

            // if (res.data.name === userData.username) {
            //   this.setState({ errors: {} });
            // } else {
            //   this.setState({ errors: { username: "Wrong Username" } });
            //   return;
            // }
            // if (res.data.birth_year === userData.passwordHash) {
            //   this.setState({ errors: {} });
            // } else {
            //   this.setState({ errors: { passwordHash: "Wrong Password" } });
            //   return;
            // }
            // set token in localStorage
            // localStorage.setItem("user_logged_in", true);
            // localStorage.setItem("username", userData.username);
            // history.push("/dashboard");
          })
          .catch(err => console.log(err));
      };










    
    render(){

        let list = this.state.planetData;
        console.log(list);
        let new_list =null;
        if(list) {
       new_list = list.map((planet) => {
         return   (
         <li key={planet.name}>
                {planet.name} : {planet.population}           
            </li>
         )
        });

    } else {
            list = (
                <li>No Planet</li>
            )
        }


        return (
          
                <Row className="justify-content-center">
                    <Col md="8">
                    <CardGroup>
                        <Card className="p-4">
                        <CardBody>
                            <Form onSubmit={this.onSubmit}>
                            <h1>Search Here</h1>
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="icon-search"></i>
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                type="text"
                                placeholder="Username"
                                autoComplete="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.onSearchHandler}
                                />
                               
                            </InputGroup>
                            </Form>
                        </CardBody>
                        </Card>
                    </CardGroup>
                    </Col>
                    <Col md="8">
                      <ul>
                          {new_list}  
                        </ul>  
                    </Col>
                </Row>
                          
        )

    }
}

export default Search;
