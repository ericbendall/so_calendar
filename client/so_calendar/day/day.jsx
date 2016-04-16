var React = require('react');
var Day = React.createClass({

  getInitialProps: function() {
    return {
      day: {
        id: -1,
        label: "",
        note: "",
        isNSFW: false
      },
      blockingNSFW: true
    }
  },

  render: function(){
    var day = this.props.day;
    var blockedNSFW = this.props.blockingNSFW && day.isNSFW;

    return <div className={'day ' + (blockedNSFW ? 'day--nsfw-blocked' : '')}>
      <div className="day__content">
        <div className="day__label">
          {day.label}
        </div>
        <div className="day__note">
          {blockedNSFW ? 'NSFW. Log in to view' : day.note}
        </div>
      </div>
    </div>
  }
});

module.exports = Day;
