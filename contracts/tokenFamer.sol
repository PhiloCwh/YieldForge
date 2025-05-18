// SPDX-License-Identifier: MIT

//ETH
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Ifactory.sol";
import "./IERC20.sol";
import "./IstakingRewards.sol";

pragma solidity ^0.8.17;

contract tokenFarmer is Ownable {
    //0xB47b1a1595E6E5c748E73A6F3860FB5f52709680
    //global variable

    Ifactory factory;
    address payable immutable feeContract;

    mapping(address => address) public tokenCreator;

    uint constant ONE_DAY = 86400;
    uint constant ONE_ETH = 10 ** 18;

    mapping(address => mapping(address => address[]))
        public tokenStakingAddrList; //stakingToken farmToken addressList
    mapping(address => address[]) public searchPoolBystakingToken;
    address[] public stakingRewardList;

    //event Message

    event DeployVault(
        address token,
        string name,
        string symbol,
        address creator,
        string description,
        string image,
        string website,
        string githubRepository,
        string twLink,
        uint idoAmount,
        uint userMaxIdoAmount,
        uint time
    );

    constructor(address _factory) Ownable(msg.sender) {
        factory = Ifactory(_factory);
    }

    receive() external payable {}

    modifier reEntrancyMutex() {
        bool _reEntrancyMutex;

        require(!_reEntrancyMutex, "FUCK");
        _reEntrancyMutex = true;
        _;
        _reEntrancyMutex = false;
    }

    //业务逻辑

    function stakingRewardList1() public view returns (address[] memory) {
        return stakingRewardList;
    }

    function createTokenFarmer(
        address _stakingToken,
        address _farmToken,
        uint256 _farmTokenAmount,
        uint _farmDuration
    ) public returns (address) {
        require(_stakingToken != address(0), "invalid staking");
        require(_farmTokenAmount != 0, "farmToken Amount == 0");
        require(_farmDuration != 0, "not set farm duration");

        //address uniswapPair = IUniswapV2Factory(uniswapRouter.factory()).getPair(_token,uniswapRouter.WETH());
        address stakingRewardAddress = factory.createStakingReward(
            _stakingToken,
            _farmToken
        );

        IERC20(_farmToken).transferFrom(
            msg.sender,
            address(this),
            _farmTokenAmount
        );
        IERC20(_farmToken).transfer(stakingRewardAddress, _farmTokenAmount);

        tokenStakingAddrList[_stakingToken][_farmToken].push(
            stakingRewardAddress
        );

        IstakingRewards stakingContract = IstakingRewards(stakingRewardAddress);
        stakingContract.setRewardsDuration(_farmDuration);
        stakingContract.notifyRewardAmount(_farmTokenAmount);

        stakingRewardList.push(stakingRewardAddress);
        return stakingRewardAddress;
    }

    //风险处理
    function withDrawBnb(
        address payable _receiptor,
        uint _amount
    ) public onlyOwner {
        payable(_receiptor).transfer(_amount);
    }
    function withDrawERC20(
        address _receiptor,
        address _token,
        uint _amount
    ) public onlyOwner {
        IERC20(_token).transfer(_receiptor, _amount);
    }

    function transferStakingRewardOwnership(
        address _vault,
        address _newOwner
    ) public onlyOwner {
        IstakingRewards stakingContract = IstakingRewards(_vault);
        stakingContract.transferOwnerShip(_newOwner);
    }
}
pragma solidity >=0.5.0;
interface IUniswapV2Factory {
    function getPair(
        address tokenA,
        address tokenB
    ) external view returns (address pair);
}
pragma solidity >=0.5.0;
interface IUniswapV2Pair {
    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    function token0() external view returns (address);
    function token1() external view returns (address);
}
