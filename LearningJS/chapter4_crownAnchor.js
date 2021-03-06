/* 크라운 앤 앵커 (주사위 게임)
* 평평한 면 위에 여섯개의 사각형이 있다.
* 각 사각형에는 크라운, 앵커, 하트, 클럽, 스페이드, 다이아몬드를 나타내는 그림이 있다.
* 플레이어는 사각형에 마음대로 돈을 걸 수 있다.
* 돈을 건 다음 (평면에 있는 사각형 숫자와 일치하는) 6면체 주사위 세 개를 굴린다.
* 주사위가 사각형 번호에 일치하는 숫자에 멈추면, 돈을 따게 된다.
*/


/*  게임조건
  1. 초기 소지금은 50펜스다.
  2. 플레이어가 100펜스를 따거나 50펜스 전부를 잃게되면 게임이 끝난다.
  3. 돈을 건다.(코드 상에선 배팅 금액은 랜덤)
  4. 배팅할 그림을 선택한다. (코드 상에선 1개의 그림을 랜덤으로 선택한다.)
  5. 주사위를 굴린다.
  6. 그림을 맞추면 돈을 가져간다.
*/

//m이상 n이하의 무작위 정수를 반환한다.
function rand(m, n) {
    return m + Math.floor((n-m+1)*Math.random());
  }
  
  function randFace() {
    return ["crown","anchor","heart","spade","club","diamond"][rand(0,5)];
  }
  
  //초기 50펜스
  let funds = 50;
  //게임횟수
  let round = 0;
  
  
  while( funds > 1 && funds < 100) {
    round++;
  
    console.log( `round : ${round}`);
    console.log( `\tStarting funds : ${funds}p`);
  
  //돈을 건다
    let bets = {crown:0, anchor:0, heart:0, spade:0, club:0, diamond:0};
  
    let totalBet = rand(1, funds);
  
    //총 배팅금액이 7 이면 하트에 가진 돈을 모두 올인
    if(totalBet === 7) {
      totalBet = funds;
      bets.heart = totalBet;
    } else {
      //판돈을 나눈다.
      let remaining = totalBet;
      do {
        let bet = rand(1, remaining);
        let face = randFace();
        bets[face] = bets[face] + bet;
        remaining = remaining - bet;
      } while(remaining > 0)
    }
  
    funds = funds - totalBet;
  
    console.log('\tbets : ' +
        Object.keys(bets).map(face => `${face}:${bets[face]} pence`).join(',')+
      `(total: ${totalBet} pence)`);
  
    //주사위를 굴린다
    const hand = [];
    for(let roll = 0; roll < 3; roll++) {
      hand.push(randFace());
    }
  
    console.log(`\thand: ${hand.join(',')}`);
  
    //딴 돈을 가져온다
    let winnings = 0;
    for(let die=0; die < hand.length; die++) {
      let face = hand[die];
      if(bets[face] > 0) winnings = winnings + bets[face];
    }
  
    funds = funds + winnings;
    console.log(`\twinnings: ${winnings}`);
  }
  
  console.log(`\tending funds : ${funds}`);