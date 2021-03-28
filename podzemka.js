const map = [  
    [1, 1, 0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],  
    [0, 1, 0, 1, 0, 0, 0, 1, 1]
]

let exclude_arr = []
let global_exclude_arr = []

const distinct_y = (pattern) => {
    let dis = []
    pattern.forEach(point => {
        if (!dis.includes(point.y)) dis.push(point.y) 
    })
    return dis
}

const is_ceil = (pattern, map) => {
    let result = 0;
    let dis = distinct_y(pattern)
    if(dis.length != map.length && dis.includes(0)) result = 1;
    return result;
}

const is_floor = (pattern, map) => {
    let result = 0;
    let dis = distinct_y(pattern)
    if(dis.length != map.length && dis.includes(map.length - 1)) result = 1;
    return result;
}

const is_both = (pattern, map) => {
    let result = 0;
    let dis = distinct_y(pattern)
    if(dis.length == map.length) result = 1;
    return result;
}


const condition_exclude = (exclude_arr, point) => {
    let response = true;
    
    exclude_arr.forEach(excluder => {
        if(excluder.x == point.x && excluder.y == point.y) response = false;
    })

    return response;
}

const start = (me, map) => {
    let friends = []

    if(me.x >= 0 && me.y-1 >= 0 && me.x < map[0].length && me.y-1 < map.length) if(map[me.y-1][me.x] && condition_exclude(exclude_arr, {x: me.x, y: me.y-1})) friends.push({x: me.x, y: me.y-1})
    if(me.x-1 >= 0 && me.y >= 0 && me.x-1 < map[0].length && me.y < map.length) if(map[me.y][me.x-1] && condition_exclude(exclude_arr, {x: me.x-1, y: me.y})) friends.push({x: me.x-1, y: me.y})
    if(me.x+1 >= 0 && me.y >= 0 && me.x+1 < map[0].length && me.y < map.length) if(map[me.y][me.x+1] && condition_exclude(exclude_arr, {x: me.x+1, y: me.y})) friends.push({x: me.x+1, y: me.y})
    if(me.x >= 0 && me.y+1 >= 0 && me.x < map[0].length && me.y+1 < map.length) if(map[me.y+1][me.x] && condition_exclude(exclude_arr, {x: me.x, y: me.y+1})) friends.push({x: me.x, y: me.y+1})

    if (condition_exclude(exclude_arr, me)) exclude_arr.push(me)

    friends.forEach(friend => {
        start(friend, map)
    });

    return(exclude_arr);
}

const scan = (map) => {
    let all_patterns = [];

    let            ceil = 0
    let            floor = 0
    let            both = 0

    map.forEach((ys, ys_i) => {
        ys.forEach((xs, xs_i) => {
            let point = {x: xs_i, y: ys_i}
            if(condition_exclude(global_exclude_arr, point) && map[point.y][point.x]) {
                let pattern = start(point, map)
                
                all_patterns.push(pattern);
                
                exclude_arr.forEach(point => {
                    global_exclude_arr.push(point)
                })

                exclude_arr = []
            }
        })
    })

    all_patterns.forEach(pattern => {
        ceil += is_ceil(pattern, map);
        floor += is_floor(pattern, map); 
        both += is_both(pattern, map);
    })

    return {ceil, floor, both}
}

const res = scan(map);

console.log(res);