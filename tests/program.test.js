import evalExpration from "../src/calculate";

it("test 1", () => {
  const state = {
    type: "constant",
    value: true,
  };

  const args = [
    {
      id: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
      name: "myArg",
      value: true,
    },
    {
      id: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      name: "x",
      value: false,
    },
    {
      id: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
      name: "y",
      value: false,
    },
    {
      id: "1201a628-7ce1-49cb-85ed-c98543fe16bd",
      name: "newarg",
      value: false,
    },
  ];

  const result = evalExpration(state, args);

  expect(result).toBe(true);
});

it("test 2", () => {
  const state = {
    type: "argument",
    value: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
  };

  const args = [
    {
      id: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
      name: "myArg",
      value: true,
    },
    {
      id: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      name: "x",
      value: false,
    },
    {
      id: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
      name: "y",
      value: false,
    },
    {
      id: "1201a628-7ce1-49cb-85ed-c98543fe16bd",
      name: "newarg",
      value: false,
    },
  ];

  const result = evalExpration(state, args);

  expect(result).toBe(false);
});

it("test 3", () => {
  const state = {
    type: "and",
    value: [
      {
        type: "constant",
        value: false,
      },
      {
        type: "argument",
        value: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
      },
    ],
  };

  const args = [
    {
      id: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
      name: "myArg",
      value: true,
    },
    {
      id: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      name: "x",
      value: false,
    },
    {
      id: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
      name: "y",
      value: false,
    },
    {
      id: "1201a628-7ce1-49cb-85ed-c98543fe16bd",
      name: "newarg",
      value: false,
    },
  ];

  const result = evalExpration(state, args);

  expect(result).toBe(false);
});

it("test 4", () => {
  const state = {
    type: "or",
    value: [
      {
        type: "argument",
        value: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
      },
      {
        type: "constant",
        value: false,
      },
    ],
  };

  const args = [
    {
      id: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
      name: "myArg",
      value: true,
    },
    {
      id: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      name: "x",
      value: false,
    },
    {
      id: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
      name: "y",
      value: false,
    },
    {
      id: "1201a628-7ce1-49cb-85ed-c98543fe16bd",
      name: "newarg",
      value: false,
    },
  ];

  const result = evalExpration(state, args);

  expect(result).toBe(true);
});

it("test 5", () => {
  const state = {
    type: "or",
    value: [
      {
        type: "argument",
        value: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      },
      {
        type: "and",
        value: [
          {
            type: "constant",
            value: false,
          },
          {
            type: "or",
            value: [
              {
                type: "argument",
                value: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
              },
              {
                type: "argument",
                value: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
              },
            ],
          },
        ],
      },
    ],
  };

  const args = [
    {
      id: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
      name: "myArg",
      value: true,
    },
    {
      id: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      name: "x",
      value: false,
    },
    {
      id: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
      name: "y",
      value: false,
    },
    {
      id: "1201a628-7ce1-49cb-85ed-c98543fe16bd",
      name: "newarg",
      value: false,
    },
  ];

  const result = evalExpration(state, args);

  expect(result).toBe(false);
});

it("test 6", () => {
  const state = {
    type: "or",
    value: [
      {
        type: "argument",
        value: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      },
      {
        type: "and",
        value: [
          {
            type: "constant",
            value: true,
          },
          {
            type: "argument",
            value: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
          },
          {
            type: "constant",
            value: true,
          },
          {
            type: "argument",
            value: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
          },
        ],
      },
    ],
  };

  const args = [
    {
      id: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
      name: "myArg",
      value: true,
    },
    {
      id: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      name: "x",
      value: false,
    },
    {
      id: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
      name: "y",
      value: false,
    },
    {
      id: "1201a628-7ce1-49cb-85ed-c98543fe16bd",
      name: "newarg",
      value: false,
    },
  ];

  const result = evalExpration(state, args);

  expect(result).toBe(false);
});

it("test 7", () => {
  const state = {
    type: "or",
    value: [
      {
        type: "argument",
        value: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      },
      {
        type: "or",
        value: [
          {
            type: "and",
            value: [
              {
                type: "argument",
                value: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
              },
              {
                type: "constant",
                value: true,
              },
            ],
          },
          {
            type: "or",
            value: [
              {
                type: "argument",
                value: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
              },
              {
                type: "constant",
                value: false,
              },
            ],
          },
        ],
      },
    ],
  };

  const args = [
    {
      id: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
      name: "myArg",
      value: true,
    },
    {
      id: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      name: "x",
      value: false,
    },
    {
      id: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
      name: "y",
      value: false,
    },
    {
      id: "1201a628-7ce1-49cb-85ed-c98543fe16bd",
      name: "newarg",
      value: false,
    },
  ];

  const result = evalExpration(state, args);

  expect(result).toBe(true);
});

it("test 8", () => {
  const state = {
    type: "or",
    value: [
      {
        type: "argument",
        value: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      },
      {
        type: "or",
        value: [
          {
            type: "and",
            value: [
              {
                type: "argument",
                value: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
              },
              {
                type: "constant",
                value: true,
              },
              {
                type: "argument",
                value: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
              },
              {
                type: "argument",
                value: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
              },
              {
                type: "constant",
                value: true,
              },
            ],
          },
          {
            type: "and",
            value: [
              {
                type: "argument",
                value: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
              },
              {
                type: "constant",
                value: true,
              },
            ],
          },
          {
            type: "constant",
            value: false,
          },
          {
            type: "constant",
            value: true,
          },
        ],
      },
    ],
  };

  const args = [
    {
      id: "c5bdd22a-ccc1-4b08-bf75-c9670346d9bc",
      name: "myArg",
      value: true,
    },
    {
      id: "36c96b1f-0dd1-4609-bef8-e66db0fa4366",
      name: "x",
      value: false,
    },
    {
      id: "b4fb0a17-d44a-43fa-98d3-d0bcfa7d0b15",
      name: "y",
      value: false,
    },
    {
      id: "1201a628-7ce1-49cb-85ed-c98543fe16bd",
      name: "newarg",
      value: false,
    },
  ];

  const result = evalExpration(state, args);

  expect(result).toBe(true);
});
