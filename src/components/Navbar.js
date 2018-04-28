import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

export class Navbar extends Component {
  componentDidMount() {
      // let $nav = $('nav.greedy');
      let $btn = $('nav.greedy button');
      let $vlinks = $('nav.greedy .links');
      let $hlinks = $('nav.greedy .hidden-links');

      let numOfItems = 0;
      let totalSpace = 0;
      let breakWidths = [];

      // Get initial state
      $vlinks.children().outerWidth(function(i, w) {
        totalSpace += w;
        numOfItems += 1;
        breakWidths.push(totalSpace);
      });

      let availableSpace, numOfVisibleItems, requiredSpace;

      function check() {

        // Get instant state
        availableSpace = $vlinks.width() - 10;
        numOfVisibleItems = $vlinks.children().length;
        requiredSpace = breakWidths[numOfVisibleItems - 1];

        // There is not enought space
        if (requiredSpace > availableSpace) {
          $vlinks.children().last().prependTo($hlinks);
          numOfVisibleItems -= 1;
          check();
          // There is more than enough space
        } else if (availableSpace > breakWidths[numOfVisibleItems]) {
          $hlinks.children().first().appendTo($vlinks);
          numOfVisibleItems += 1;
        }
        // Update the button accordingly
        $btn.attr("count", numOfItems - numOfVisibleItems);
        if (numOfVisibleItems === numOfItems) {
          $btn.addClass('hidden');
        } else $btn.removeClass('hidden');
      }

      // Window listeners
      $(window).resize(function() {
        check();
      });

      $btn.on('click', function() {
        $hlinks.toggleClass('hidden');
      });

      check();
  }
  render() {

    return (
      <div className="nav-wrapper">
        <nav className='greedy' id="page-top">
          <h1>
          <img src="http://res.cloudinary.com/dattofkud/image/upload/v1524096719/cryptocat/cryptocroc/coincroc-brand.png"
                alt="coincroc-brand" />
          </h1>
            <ul className='links'>
              <li><Link to="/">Cryptocurrencies</Link></li>
              <li><Link to="/industries">Industries</Link></li>
              <li><Link to="/about">About</Link></li>
              {
                (!!this.props.isLoggedIn) ? 
                <li><Link to="/dashboard">Dashboard</Link></li> :
                <li><Link to="/login">Login</Link></li>
              } 
              {
                (!!this.props.isLoggedIn) ? 
                <li><Link to="/logout">Logout</Link></li> :
                null
              }                              
            </ul>
          <button>MENU</button>
          <ul className='hidden-links hidden'></ul>
        </nav>
      </div>
    )
  }
}
