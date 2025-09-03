
// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract wallet{

     uint public tbalance;

     address private owner;

     modifier onlyOwner() { 
        require(msg.sender == owner,"Not the  designated owner");
        _;
     }

    bool private locked;

    modifier noreentrancy(){
        require(!locked,"it is already secure");
        locked=true;
        _;
        locked=false;

    }

    mapping (address=>uint)withdrawtime;

    modifier ratelimiter(uint delay){
        require(block.timestamp>=delay+withdrawtime[msg.sender],"too early to initate another transaction");
        _;
        withdrawtime[msg.sender]=block.timestamp;
    }


    event Deposits(uint _amount,address indexed _from);
    event Withdrawal( uint _amount,address indexed from,address indexed to);

     mapping(address => bool) private guardians;   
     address[5] private guardianList;

    constructor(address[] memory _guardians) {
        require(_guardians.length == 5, "Must have exactly 5 guardians");
        owner = msg.sender;
        for (uint i = 0; i < 5; i++) {
            guardians[_guardians[i]] = true;
              guardianList[i] = _guardians[i];
        }
    }

    address proposedOwner;
    mapping(address => bool) public approvals;
    uint public approvalCnt;

    function proposeNewOwner(address newOwner)public{
       require(guardians[msg.sender], "Only guardians can propose");
       require(proposedOwner == address(0) || proposedOwner == newOwner, "Another proposal active");
       if (!approvals[msg.sender]) {
            approvals[msg.sender] = true;
            approvalCnt++;
        }
        proposedOwner=newOwner;
         if (approvalCnt >= 3) {
            owner = proposedOwner;

           //reset
            proposedOwner = address(0);
            approvalCnt = 0;
            for (uint i = 0; i < 5; i++) {
                approvals[guardianList[i]] = false;
            }
        }
    }

    mapping(address=>uint)public balances;
    receive() external payable { }
    function deposits()public payable{

        require(msg.value>0,"insufficient fund to deposit");
        balances[msg.sender]+=msg.value;
        tbalance += msg.value;
    }

    struct  Details{
        address payable toAddress;
        uint amount; 
    }
    Details[] public txnlist;
    function withdrawal( uint _amt,address payable  _to)public noreentrancy ratelimiter(5){
        require(balances[msg.sender]>=_amt,"Insufficient funds to withdraw");
        require(_to != address(0), "Cannot withdraw to zero address");

        balances[msg.sender]-=_amt;
        tbalance-=_amt;

    
        _to.transfer(_amt);


           txnlist.push(Details({
           toAddress: _to,
           amount: _amt  
        }));
        emit Withdrawal(_amt,msg.sender, _to);
    }

    mapping(address=>mapping(address=>uint))  public allowance;



    function approval(address _subOwner,uint _amt)public {
            allowance[msg.sender][_subOwner]=_amt;
    }
    function subWithdraw(address _owner,uint _amt)public noreentrancy ratelimiter(5) {
        require(allowance[_owner][msg.sender]>=_amt,"Insufficient funds to withdraw");
        require(balances[_owner]>=_amt,"Owner doesnt have sufficient funds");
        require(_owner != address(0), "Invalid owner address");
        allowance[_owner][msg.sender]-= _amt;
        balances[_owner]-= _amt;
        tbalance-=_amt;

        payable(msg.sender).transfer(_amt);

        emit Withdrawal(_amt,_owner,msg.sender);
        txnlist.push(Details({toAddress:payable (msg.sender), amount: _amt}));
    }
}