import React from 'react';
import './Newtab.css';
import './Newtab.scss';
import ReactTooltip from 'react-tooltip';
import { useEffect } from 'react';
import "regenerator-runtime";

export const backgroundColors = [
  '#BD9EA8',
  '#B49082',
  '#4D243D',
  '#3C6E71',
  '#6796A2',
  '#A26769',
  '#383B56',
  '#95BBDB',
  '#A5C482',
  '#B8B18E',
  '#FFD6E0',
  '#8A6A79',
  '#FFEF9F',
  '#87BBA2',
  '#55828B',
  '#3B6064',
  '#364958',
  '#ffb5a7',
  '#fcd5ce',
  '#ffcdb2',
  '#ffb4a2',
  '#e5989b',
  '#b5838d',
  '#6d6875',
  '#e6ccb2',
  '#ddb892',
  '#b08968',
  '#8e9aaf',
  '#cbc0d3',
  '#efd3d7',
  '#ADB7FF',
  '#8c2f39',
  '#b23a48',
  '#87bba2',
  '#735d78',
  '#b392ac',
  '#b56576',
  '#89b0ae',
  '#586f6b',
  '#aa93b4',
];

const insultTemplates = [
  'you are a {0} {1}',
  'you\'re such a {0} {1}',
  'you are nothing but a {0} {1}',
  'you are nothing if not a {0} {1}',
  'what a {0} {1} you are!',
  'never have I met a {1} as {0} as you',
  'not only are you a {1}, but you\'re a {0} {1} at that!',
  'hey! how\'s this {0} {1} doing?',
  'how {0} can a {1} even be?!',
  'achoo! ah, there must be a {0} {1} nearby',
  'look! there goes that {0} {1} again',
  'if only you weren\'t such a {0} {1}...',
  'how do you live with as {0} a {1} as yourself?',
  'yet another day waking up as a {0} {1}',
  'you don\'t need a costume to be a {0} {1} for halloween!',
  'wow, it\'s possible to be both {0} and a {1}?',
  'your face is on the wikipedia article for \"{0} {1}\"',
  'what\'s it like being such a {0} {1}?',
];

const insultNouns = ['doorknob', 'aberration', 'abomination', 'barbarian', 'cannibal', 'cretin', 'cesspool', 'degenerate', 'delinquent', 'derelict', 'dolt', 'dullard', 'dunce', 'fiend', 'filcher', 'glutton', 'half-wit', 'heathen', 'idiot', 'ignoramus', 'imbecile', 'lackey', 'lecher', 'libertine', 'loafer', 'lout', 'malefactor', 'miscreant', 'misdemeanant', 'narcissist', 'neanderthal', 'nincompoop', 'oaf', 'onanist', 'parasite', 'peon', 'plebeian', 'polisson', 'rapscallion', 'reprobate', 'reprobate', 'ruffian', 'scoundrel', 'simpleton', 'slattern', 'sphincter', 'sycophant', 'sycophant', 'troglodyte', 'trollop', 'twerp', 'varmint', 'vermin', 'wretch', 'bitch', 'coward', 'dunce', 'bonehead', 'jackass', 'dingbat', 'dork', 'pansy', 'smatchet', 'blighter', 'dandiprat', 'stinkard', 'stinker', 'fustilugs', 'prickmedainty', 'ultracrepidarian', 'flibbertigibbet', 'epistemophiliac', 'knipperdolling', 'sloven', 'slob', 'dodunk', 'mumchance', 'draffsack', 'gormandizer', 'dunderhead', 'blinkard', 'huckster'];

const insultAdjectives = ['antiquated', 'asinine', 'banal', 'brazen', 'catty', 'churlish', 'clammy', 'contrary', 'daft', 'damned', 'deceitful', 'decrepit', 'deficient', 'degrading', 'deleterious', 'devoid', 'dim', 'dismal', 'disreputable', 'dopey', 'dreary', 'drunken', 'dubious', 'dysfunctional', 'fatuous', 'feckless', 'glib', 'grotesque', 'imbecilic', 'impertinent', 'indecorous', 'indiscreet', 'infantile', 'jejune', 'lurid', 'malevolent', 'misshapen', 'morbid', 'moribund', 'mundane', 'petulant', 'puerile', 'rambunctious', 'repugnant', 'truculent', 'unkempt', 'vainglorious', 'vapid', 'clingy', 'bitchy', 'thoughtless', 'callous', 'vain', 'patronizing', 'aloof', 'domineering', 'machiavellian', 'obstinate', 'cantankerous', 'big-headed', 'stubborn', 'tactless', 'possessive', 'resentful', 'cowardly', 'gullible', 'weak', 'weak-willed', 'sullen', 'touchy', 'finicky', 'slovenly', 'addlepated', 'nescient'];

async function getDefinition(word) {
  return await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => data[0]["meanings"][0]["definitions"][0]["definition"])
    .catch(() => "this word is too advanced for our dictionary :(");
}

function changeShade(col, amt) {
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

function stripPunctuation(s) {
  return s.replace(/[!?.,()'"]/g, "");
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

// Fix a vs. an
const vowels = ['a', 'e', 'i', 'o', 'u'];
if (insult.includes('a')) {
  const articleIdx = insult.indexOf('a');
  if (vowels.includes(insult[articleIdx+1][0])) {  // if the word after the article starts with a vowel
    insult[articleIdx] = 'an';
  }
}

const Newtab = () => {
  const [defs, setDefs] = React.useState(Object.fromEntries(insult.map((t) => [stripPunctuation(t), ""])));

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
      <header className='App-header' style={{ background: `linear-gradient(45deg, ${changeShade(backgroundColor, -10)} 0%, ${changeShade(backgroundColor, 15)} 100%)` }}>
        <div style={{ "display": "flex", "flexDirection": "row", "flexWrap": "wrap", justifyContent: "center" }}>
          {
            insult.map((word) => (
              <p data-tip={defs[stripPunctuation(word)]} key={word} style={{ "textShadow": `3px 4px ${changeShade(backgroundColor,  -30)}`, margin: "1px" }}>
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
