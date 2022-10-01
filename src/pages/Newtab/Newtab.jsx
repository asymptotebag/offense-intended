import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';

const backgroundColors = ['#BD9EA8',
                          '#B49082',
                          '#4D243D',
                          '#3C6E71',
                          '#6796A2',];

const insultTemplates = ['you are such a {0} {1}'];

const insultNouns = ['doorknob'];

const insultAdjectives = ['antiquated','asinine','banal','brazen','catty','churlish','clammy','contrary','daft','damned','deceitful','decrepit','deficient','degrading','deleterious','devoid','dim','dismal','disreputable','dopey','dreary','drunken','dubious','dysfunctional','fatuous','feckless','glib','grotesque','imbecilic','impertinent','indecorous','indiscreet','infantile','jejune','lurid','malevolent','misshapen','morbid','moribund','mundane','petulant','puerile','rambunctious','repugnant','truculent','unkempt','vainglorious','vapid'];

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

const insult = insultTemplates[Math.floor(Math.random()*insultTemplates.length)].format(insultAdjectives[Math.floor(Math.random()*insultAdjectives.length)], insultNouns[Math.floor(Math.random()*insultNouns.length)])

const Newtab = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {insult}
        </p>
      </header>
    </div>
  );
};

export default Newtab;
