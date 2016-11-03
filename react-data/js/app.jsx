"use strict";

/*var females = BABYNAMES.filter(function(record) {
    return "F" == record.sex;
});

console.log(females.length);*/

//ES6 can make one-line anon functions more concise:

var females = BABYNAMES.filter(record => "F" == record.sex);

//if you have one parameter, can delete extra ()
//you also don't need the {} and return statement!

console.log(females.length);

//big arrow syntax for sort too!

var topFemNames = females.sort((rec1, rec2) => rec2.count - rec1.count).slice(0,100);

console.log(topFemNames.length);




//main application React component
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    //called by React framework to render content on page
    //the React syntax removes the need to do document.createElement

    render() {
        var colMeta = {
            count: {
                type: columnTypes.numeric,
                caption: "Num of Babies"
            }
        }

        return (
            <div className="container">
                <h1>Most Popular Female Baby Names from 1996</h1>

                <DataTable records={this.props.records}     columnMeta={colMeta}/>
            </div>
        );
    }
}

//render the App component to the element with id="app"
ReactDOM.render(<App records={topFemNames}/>, document.getElementById("app"));


/*<ul>
    {
        this.props.records.map(record => <li key={record.name}>{record.name} {record.count}</li>)
    }
</ul>*/