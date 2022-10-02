import React from 'react';
import './Newtab.css';
import './Newtab.scss';
import ReactTooltip from 'react-tooltip';
import { useEffect } from 'react';

const backgroundColors = ['#BD9EA8', '#B49082', '#4D243D', '#3C6E71', '#6796A2', '#A26769', '#383B56', '#95BBDB', '#A5C482', '#B8B18E'];

const insultTemplates = ['you are such a {0} {1}'];

const insultNouns = ['doorknob', 'aberration', 'abomination', 'barbarian', 'cannibal', 'cretin', 'cesspool', 'degenerate', 'delinquent', 'derelict', 'dolt', 'dullard', 'dunce', 'fiend', 'filcher', 'glutton', 'half-wit', 'heathen', 'idiot', 'ignoramus', 'imbecile', 'lackey', 'lecher', 'libertine', 'loafer', 'lout', 'malefactor', 'miscreant', 'misdemeanant', 'narcissist', 'neanderthal', 'nincompoop', 'oaf', 'onanist', 'parasite', 'peon', 'plebeian', 'polisson', 'rapscallion', 'reprobate', 'reprobate', 'ruffian', 'scoundrel', 'simpleton', 'slattern', 'sphincter', 'sycophant', 'sycophant', 'troglodyte', 'trollop', 'twerp', 'varmint', 'vermin', 'wretch'];

const insultAdjectives = ['antiquated', 'asinine', 'banal', 'brazen', 'catty', 'churlish', 'clammy', 'contrary', 'daft', 'damned', 'deceitful', 'decrepit', 'deficient', 'degrading', 'deleterious', 'devoid', 'dim', 'dismal', 'disreputable', 'dopey', 'dreary', 'drunken', 'dubious', 'dysfunctional', 'fatuous', 'feckless', 'glib', 'grotesque', 'imbecilic', 'impertinent', 'indecorous', 'indiscreet', 'infantile', 'jejune', 'lurid', 'malevolent', 'misshapen', 'morbid', 'moribund', 'mundane', 'petulant', 'puerile', 'rambunctious', 'repugnant', 'truculent', 'unkempt', 'vainglorious', 'vapid'];

async function getDefinition(word) {
  return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => data[0]["meanings"][0]["definitions"][0]["definition"])
    .catch(() => "No definition found");
}

function shadowColor(col, amt) {
  var usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}

const template = insultTemplates[Math.floor(Math.random() * insultTemplates.length)];
const adj = insultAdjectives[Math.floor(Math.random() * insultAdjectives.length)];
const noun = insultNouns[Math.floor(Math.random() * insultNouns.length)];
const backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
const insult = template.format(adj, noun).split(' ');

const Newtab = () => {
  const [defs, setDefs] = React.useState(Object.fromEntries(insult.map((t) => [t, ""])));

  useEffect(() => {
    // Reload if spacebar is pressed
    window.addEventListener("keydown", ({ key }) => { key == " " ? window.location.reload() : null });
    // Load definitions for adj and noun
    [adj, noun].map(x => getDefinition(x).then
      ((data) => {
        setDefs((defs) => ({ ...defs, [x]: data }));
      }));
  }, []);

  return (
    <div className='App'>
      <header className='App-header' style={{ 'backgroundColor': backgroundColor }}>
        <div style={{ "display": "flex", "flexDirection": "row" }}>
          {
            insult.map((word) => (
              <p data-tip={defs[word]} key={word} style={{ "textShadow": `3px 4px ${shadowColor(backgroundColor,  -40)}` }}>
                {word}{' '}
              </p>
            ))
          }
        </div>
        <ReactTooltip place='bottom' />
      </header>
    </div>
  );
};

export default Newtab;
